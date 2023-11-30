import { Link, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { useState, useEffect } from "react";

function EditTask() {
	const [tasks, settasks] = useState([]);
	const [taskName, setTaskName] = useState("");
	const { id } = useParams();
	const [formStatus, setformStatus] = useState({
		formMsg: "",
		formSuccess: true,
	});
	// for checkbox
	const [isChecked, setIsChecked] = useState(false);
	const handleCheckboxChange = (e) => {
		setIsChecked(e.target.checked);
	};
	// console.log(isChecked);
	// fetch data
	async function fetchData() {
		try {
			const { data } = await axios("/task");
			// console.log(data);
			const filteredData = data.filter((item) => item.id == id);

			settasks(() => {
				return filteredData;
			});
		} catch (error) {
			console.log(error);
		}
	}

	// fetch
	useEffect(() => {
		fetchData();
	}, []);
	let namedTask = tasks[0]?.task_name;
	
	// Having the input field an initial default value with fetched task name
	useEffect(() => {
		setTaskName(namedTask);
	},[tasks])
	
	// edit status alert
	function formStatusLOgic(msg, status) {
		setformStatus({
			formMsg: msg,
			formSuccess: status,
		});
		setTimeout(() => {
			setformStatus({
				formMsg: "",
				formSuccess: true,
			});
		}, 3000);
	}
	// update task
	async function updateTask(e) {
		e.preventDefault();
		try {
			let { data } = await axios.patch("/task/" + id, {
				name: taskName,
				completed: isChecked,
			});
			console.log(data);
			formStatusLOgic("Success edited task", true);
		} catch (error) {}
	}

	return (
		<div className="container">
			<form className="task-form " onSubmit={updateTask}>
				<h4>Edit task </h4>
				{tasks.map((item, i) => (
					<div className="" key={i}>
						<div className="row">
							<div className="col-md-6">Task id:</div>
							<div className="col-md-6">{item.id}</div>
						</div>
						<div className="row">
							<div className="col-md-6">Task name:</div>
							<div className="col-md-6">
								<input
									type="text"
									value={taskName}
									onChange={(e) => setTaskName(e.target.value)}
									name="name"
									className="task-input input-padd"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">Completed </div>
							<div className="col-md-6">
								<input
									className="checkbox"
									type="checkbox"
									name=""
									id=""
									checked={isChecked}
									onChange={handleCheckboxChange}
								/>
							</div>
						</div>

						<button type="submit" className="btn submit-btn block">
							Edit
						</button>
						<div
							className={`form-alert ${
								formStatus.formSuccess ? "alert-success" : "alert-danger"
							}`}
						>
							{formStatus.formMsg}
						</div>
					</div>
				))}
			</form>
			<Link to={`/`}>
				<button className="btn  back-link ">Back to Home Page</button>
			</Link>
			<div></div>
		</div>
	);
}
export default EditTask;
