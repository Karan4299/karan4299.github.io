import { useState, useEffect } from "react";

/* eslint-disable */
const useMain = () => {
	const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const [gameState, setGameState] = useState<boolean>(false);
	const [inputFieldValue, setInputFieldValue] = useState<string>("");
	const [timer, setTimer] = useState<number>(0.0);
	const [curAlphabet, setCurAlphabat] = useState<string>("Click Start");
	const [penalty, setPenalty] = useState<number>(0.0);
	const [timeintevalS, setIntervalS] = useState<any>(0.0);
	const [counterIntervalS, setCounterIntervalS] = useState<any>(0.0);
	const [counter, setCounter] = useState<number>(3);
	const [bestScore, setBestScore] = useState<string | null>(
		localStorage.getItem("bestScore")
	);

	useEffect(() => {
		if (gameState) {
			let starVal = 3;
			const counterInterval = setInterval(() => {
				setCurAlphabat(`${starVal}`);
				starVal -= 1;
				if (starVal === -1) {
					setCounter(0);
				}
			}, 1000);
			if (counterIntervalS !== counterInterval)
				setCounterIntervalS(counterInterval);

			setTimeout(() => {
				clearInterval(counterInterval);
				setCurAlphabat(alphabets.charAt(Math.floor(Math.random() * 26)));
			}, 4000);
		}
	}, [gameState]);

	useEffect(() => {
		if (counter === 0) {
			let startDate = new Date();

			const timeInterval = setInterval(() => {
				let endDate = new Date();
				setTimer((endDate.getTime() - startDate.getTime()) / 1000);
			}, 0);
			if (timeintevalS !== timeInterval) setIntervalS(timeInterval);

			// setTimeout(() => {
			// 	clearInterval(timeInterval);
			// }, 10000);
		}
	}, [counter]);

	const handleReset = (message?: string) => {
		setCurAlphabat(!message ? "Click Start" : message);
		setPenalty(0.0);
		setCounter(3);
		setTimer(0);
		setInputFieldValue("");
		setGameState(false);
		clearInterval(timeintevalS);
		if (counterIntervalS !== 0.0) clearInterval(counterIntervalS);
	};

	useEffect(() => {
		if (inputFieldValue.length > 0) {
			const enteredKey = inputFieldValue.charAt(inputFieldValue.length - 1);
			if (enteredKey.toUpperCase() !== curAlphabet) {
				console.log("yes");
				setPenalty(penalty + 0.5);
			}

			if (inputFieldValue.length >= 20) {
				console.log(inputFieldValue.length);
				if (bestScore === null || timer + penalty < parseFloat(bestScore)) {
					localStorage.setItem("bestScore", timer + penalty + "");
					setBestScore(penalty + timer + "");
						handleReset("Success");
				} else {
						handleReset("Oh no");
				}

                return;
			}

            setCurAlphabat(alphabets.charAt(Math.floor(Math.random() * 26)));
		}
			
	}, [inputFieldValue]);

	const handleStart = () => {
		setGameState(true);
	};

	const getRandomAlphabets = (): string => {
		const randomValueBetween0to26 = Math.floor(Math.random() * 26);
		console.log(alphabets.charAt(randomValueBetween0to26));
		return alphabets.charAt(randomValueBetween0to26);
	};

	return {
		gameState,
		penalty,
		bestScore,
		curAlphabet,
		inputFieldValue,
		handleStart,
		handleReset,
		setInputFieldValue,
		getRandomAlphabets,
		// startGame,
		timer,
	};
};

export default useMain;
