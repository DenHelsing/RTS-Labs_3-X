import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    Button,
    TouchableHighlight,
} from "react-native";

import styles from "./styles";
import globalStyles from "../global-styles";

import { calcFactorization } from "./functions";

import { Output } from "./Output";
import { TouchableOpacityComponent } from "react-native";

export const Ferma = () => {
    const [n, setN] = useState(-1);
    const [infoMessage, setinfoMessage] = useState(
        "Input n and press 'Calculate'"
    );
    const [result, setResult] = useState({});

    const inputN = (n) => {
        if (!isNaN(+n)) {
            if (n > 1) {
                if (n % 2 == 1) {
                    setN(+n);
                    setinfoMessage("n is successfuly writen");
                } else {
                    setinfoMessage("Enter an odd number");
                }
            } else {
                setinfoMessage("Enter n greater than 0");
                if (n == "") {
                    setN(-1);
                }
            }
        } else {
            setinfoMessage("Enter a number");
        }
    };

    const fermaFactor = (n) => {
        const result = calcFactorization(n);
        setResult({
            a: result[0],
            b: result[1],
            steps: result[2],
            n: result[3],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={globalStyles.header}>Ferma Factorization</Text>
            <TextInput
                placeholder="Input n"
                style={styles.textInput}
                onChangeText={(text) => inputN(text)}
                keyboardType={"number-pad"}
            />
            <Text>{infoMessage}</Text>
            <TouchableHighlight style={styles.button}>
                <Button
                    title="Calculate"
                    onPress={() => fermaFactor(n)}
                    disabled={n < 1 || isNaN(+n) || n % 2 == 0}
                />
            </TouchableHighlight>
            {Object.keys(result).length == 0 ? null : (
                <Output result={result} />
            )}
        </View>
    );
};
