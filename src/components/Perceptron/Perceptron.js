import React, { useState } from "react";

import { Text, View, TouchableHighlight, Button, Picker } from "react-native";

import styles from "./styles.js";
import globalStyles from "../global-styles";

import { calculate, parseResult } from "./functions";

export const Perceptron = () => {
    const points = [
        [0, 6],
        [1, 5],
        [3, 3],
        [2, 4],
    ];
    const speeds = [0.001, 0.01, 0.05, 0.1, 0.2, 0.3];
    const [speed, setSpeed] = useState(0.001);
    const timeDeadlines = [0.5, 1, 2, 5];
    const [timeDeadline, setTimeDeadline] = useState(0.5);
    const iterationDeadlines = [100, 200, 500, 1000];
    const [iterationDeadline, setIterationDeadline] = useState(100);

    const [result, setResult] = useState([]);
    const P = 4;

    const teachPerceptron = () => {
        const result = calculate(
            points,
            +speed,
            +timeDeadline,
            +iterationDeadline,
            P
        );
        setResult(result);
    };

    return (
        <View style={styles.container}>
            <Text style={globalStyles.header}>Perceptron</Text>
            <View style={styles.selectBlock}>
                <Text style={globalStyles.subheader}>Choose parameters:</Text>
                <View>
                    <Text>Speed:</Text>
                    <Picker
                        selectedValue={speed}
                        style={styles.select}
                        onValueChange={setSpeed}
                    >
                        <Picker.Item label={`${speeds[0]}`} value={speeds[0]} />
                        <Picker.Item label={`${speeds[1]}`} value={speeds[1]} />
                        <Picker.Item label={`${speeds[2]}`} value={speeds[2]} />
                        <Picker.Item label={`${speeds[3]}`} value={speeds[3]} />
                        <Picker.Item label={`${speeds[4]}`} value={speeds[4]} />
                        <Picker.Item label={`${speeds[5]}`} value={speeds[5]} />
                    </Picker>
                </View>
                <View>
                    <Text>Time Deadline:</Text>
                    <Picker
                        selectedValue={timeDeadline}
                        onValueChange={setTimeDeadline}
                        style={styles.select}
                    >
                        <Picker.Item
                            label={`${timeDeadlines[0]}`}
                            value={timeDeadlines[0]}
                        />
                        <Picker.Item
                            label={`${timeDeadlines[1]}`}
                            value={timeDeadlines[1]}
                        />
                        <Picker.Item
                            label={`${timeDeadlines[2]}`}
                            value={timeDeadlines[2]}
                        />
                        <Picker.Item
                            label={`${timeDeadlines[3]}`}
                            value={timeDeadlines[3]}
                        />
                    </Picker>
                </View>
                <View>
                    <Text>Iterations Deadline:</Text>
                    <Picker
                        itemStyle={styles.item}
                        selectedValue={iterationDeadline}
                        style={styles.select}
                        onValueChange={setIterationDeadline}
                    >
                        <Picker.Item
                            label={`${iterationDeadlines[0]}`}
                            value={iterationDeadlines[0]}
                        />
                        <Picker.Item
                            label={`${iterationDeadlines[1]}`}
                            value={iterationDeadlines[1]}
                        />
                        <Picker.Item
                            label={`${iterationDeadlines[2]}`}
                            value={iterationDeadlines[2]}
                        />
                        <Picker.Item
                            label={`${iterationDeadlines[3]}`}
                            value={iterationDeadlines[3]}
                        />
                    </Picker>
                </View>
            </View>
            {/* <TextInput
                    placeholder="Input n"
                    style={styles.textInput}
                    keyboardType={"number-pad"}
                /> */}
            {/* <Text>{infoMessage}</Text> */}
            <TouchableHighlight style={styles.button}>
                <Button
                    title="Calculate"
                    onPress={teachPerceptron}
                    // disabled={n < 1 || isNaN(+n) || n % 2 == 0}
                />
            </TouchableHighlight>
            {parseResult(result)}
        </View>
    );
};
