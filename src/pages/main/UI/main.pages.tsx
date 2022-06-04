import Input from "antd/lib/input/Input";
import React from "react";
import useMain from "../Hooks";
import "./main.pages.scss";

/* eslint-disable */

const Main: React.FC = () => {
	const {
		gameState,
		penalty,
		curAlphabet,
		inputFieldValue,
		timer,
		bestScore,
		handleReset,
		handleStart,
		setInputFieldValue,
		getRandomAlphabets,
	} = useMain();

	return (
		<div className='main-cotainer'>
			<div className='game-container'>
				<div className='game-type-the-alpha-container'>Type The Alphabet</div>
				<div className='game-header-below-description-container'>
					Typing game to see how fast you type. Timer starts when you do: :)
				</div>
				<div
					className='game-aphabet-display-field'
					style={
						curAlphabet === "Oh no" ? { color: "red" } : { color: "green" }
					}
				>
					{curAlphabet}
				</div>
				<div className='game-timer-container'>
					Time: {timer?.toFixed(1)}s{" "}
					<span>{penalty !== 0.0 ? `+ penalty: ${penalty}` : ""}</span>
				</div>
				<div className='game-best-timer-container'>
					my best time: {bestScore === null ? "0.000" : bestScore}s
				</div>
				<div className='game-input-box-container'>
					<Input
						value={inputFieldValue}
						onChange={(value) => setInputFieldValue(value.target.value)}
						className='game-input-box'
						placeholder='Type here'
						disabled={!gameState || timer === 0.0}
					/>
					<button
						disabled={gameState && timer === 0.0}
						onClick={() => {
							!gameState ? handleStart() : handleReset();
						}}
						onKeyDown={() => handleReset()}
						className='game-input-button'
						role='button'
					>
						{!gameState ? "Start" : "Reset"}
					</button>
				</div>
				{/* <div onClick={() => handleStart()}>start</div> */}
			</div>
		</div>
	);
};

export default Main;
