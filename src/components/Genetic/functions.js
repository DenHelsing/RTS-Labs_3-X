import makeChromosome from './chromosomes-functions.js';

const DONE_FLAG = -1;
const FAILED_FLAG = -2;
const POPULATION_COUNT = 5;
const GENES_COUNT = 4;
const GENE_MIN = 1;
const MAX_ITERATIONS = 10000;

let GENE_MAX;

export const getRandomFloat = (min, max) => Math.random() * max + min;
export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max + 1) + min);

export const Array2D = (N, M) =>
  Array(N)
    .fill(0)
    .map((_) => Array(M).fill(0));

export const toNum = (obj, res = {}) => {
  for (const prop in obj) {
    res[prop] = Number(obj[prop]);
  }
  return res;
};

const setGeneMax = (y) => {
  GENE_MAX = y >= 10 ? Math.floor(y / 10) : y;
};

let population = new Array(POPULATION_COUNT);

const getRandomGene = () => getRandomInt(GENE_MIN, GENE_MAX);

const createInitialPopulation = () => {
  for (let i = 0; i < POPULATION_COUNT; ++i) {
    population[i] = makeChromosome({ GENES_COUNT, GENE_MIN, GENE_MAX });
    population[i].getGenes()[i] = getRandomGene();
  }
};
const setPopulation = (_population) => (population = _population);

const fillChromosomesWithFitnesses = (coeffs) => {
  for (let i = 0; i < POPULATION_COUNT; ++i) {
    const currentFitness = population[i].calculateFitness(coeffs);
    population[i].setFitness(currentFitness);
    if (currentFitness === DONE_FLAG) return i;
  }
  return FAILED_FLAG;
};
const getAllFitnessesSum = () => {
  let allFitnessesSum = 0;
  for (let i = 0; i < POPULATION_COUNT; ++i)
    allFitnessesSum += population[i].getFitness();

  return allFitnessesSum;
};
const fillChromosomeWithLikelihoods = () => {
  const allFitnessesSum = getAllFitnessesSum();
  let last = 0;
  let i;
  for (i = 0; i < POPULATION_COUNT; ++i) {
    const likelihood =
      last + (100 * population[i].getFitness()) / allFitnessesSum;
    last = likelihood;
    population[i].setLikelihood(likelihood);
  }
};
const getChromosomeNumberForThisRand = (rand) => {
  let i;
  for (i = 0; i < POPULATION_COUNT; ++i) {
    if (rand <= population[i].getLikelihood()) {
      return i;
    }
  }
  return i - 1;
};

const getPairsForCrossover = () => {
  const pairs = Array2D(POPULATION_COUNT, 2);
  let rand = getRandomFloat(0, 100);

  for (let i = 0; i < POPULATION_COUNT; ++i) {
    rand = getRandomFloat(0, 100);
    const firstChromosome = getChromosomeNumberForThisRand(rand);
    let secondChromosome;
    do {
      rand = getRandomFloat(0, 100);
      secondChromosome = getChromosomeNumberForThisRand(rand);
    } while (firstChromosome === secondChromosome);

    pairs[i][0] = firstChromosome;
    pairs[i][1] = secondChromosome;
  }

  return [pairs, rand];
};
//perform crossover; mutation for population; GetNextGeneration
const getNextGeneration = (pairs) => {
  const nextGeneration = new Array(POPULATION_COUNT);
  for (let i = 0; i < POPULATION_COUNT; ++i) {
    const firstParent = population[pairs[i][0]];
    const secondParent = population[pairs[i][1]];
    const result = firstParent.singleCrossover(secondParent);
    nextGeneration[i] = result.mutateWithGivenLikelihood();
  }
  return nextGeneration;
};

export const calcGenetic = (coeffs) => {
  let optimalPercent = 0;
  setGeneMax(coeffs.y);
  createInitialPopulation();
  let generations = 0;
  for (generations = 0; generations < MAX_ITERATIONS; generations++) {
    const ind = fillChromosomesWithFitnesses(coeffs);

    if (ind != FAILED_FLAG) {
      return [
        `${population[
          ind
        ].toString()} Оптимальний відсоток: ${optimalPercent.toFixed(
          2
        )} Кількість поколінь: ${generations}`,
        ''
      ];
    }

    fillChromosomeWithLikelihoods();
    const [pairs, percent] = getPairsForCrossover();
    optimalPercent = percent;
    const nextGeneration = getNextGeneration(pairs);
    setPopulation(nextGeneration);
  }
  return [
    '',
    `Рішення не знайдено. Оберіть інші Коефіцієнти Кількість поколінь: ${generations}`
  ];
};
