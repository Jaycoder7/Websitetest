import React from "react";
import "./App.css";
import "./assets/scss/responsive.scss";
import Header from "./Components/Header/Header";
import Admin from "./Pages/Admin";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Database from "./Database";
import * as idb from "idb";
import NewTeam from "./Components/Teams/NewTeam";
const App = () => {
	const [database, setDatabase] = useState();
	useEffect(() => {
		const stuff = async () => {
			const db = await idb.openDB("manto", 1, {
				upgrade(db, oldVersion, newVersion, transaction) {
					Database.first_time(db);
				},
			});

			setDatabase(db);
		};
		stuff();
	}, []);
	return (
		<div className="app">
			<BrowserRouter>
				<Header></Header>
				<Routes>
					<Route path="/" element={<h1>HOME PAGE</h1>} />
					<Route
						path="/admin"
						element={<Admin database={database}></Admin>}
					/>
					<Route
						path="/teams/new"
						element={<NewTeam database={database}></NewTeam>}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
