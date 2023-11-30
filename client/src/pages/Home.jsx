import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from '../axiosConfig';

function Home() {
	const [tasks, settasks] = useState([]);
	const [isLoading, setisLoding] = useState(false);

	// task name state
	const [taskName, settaskName] = useState('');

	const [formStatus, setformStatus] = useState({
		formMsg: '',
		formSuccess: true,
	});

	// fetch data
	async function fetchData() {
		try {
			setisLoding(true);
			const { data } = await axios('/task');
			// console.log(data);
			settasks(data);
			setisLoding(false);
		} catch (error) {
			setisLoding(false);
			console.log(error);
			formStatusLOgic("Couldn't fetch data", false);
		}
	}

	function formStatusLOgic(msg, status) {
		setformStatus({
			formMsg: msg,
			formSuccess: status,
		});
		if (status) {
			setTimeout(() => {
				setformStatus({
					formMsg: '',
					formSuccess: true,
				});
			}, 3000);
		}
	}

	// create a new task
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			if (!taskName) {
				formStatusLOgic('task name is required', false);
				return;
			}
			await axios.post('/task/create', {
				name: taskName,
			});
			settaskName('');
			fetchData();
			formStatusLOgic('task created successfully', true);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDelete(id) {
		try {
			await axios.delete('/task/' + id);
			fetchData();
			formStatusLOgic('task deleted successfully', true);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<form className='task-form ' onSubmit={handleSubmit}>
				<h4>task manager</h4>
				<div className='form-control'>
					<input
						value={taskName}
						onChange={e => {
							settaskName(e.target.value);
						}}
						type='text'
						name='name'
						className='task-input'
						placeholder='e.g. learn nodejs'
					/>
					<button type='submit' className='btn submit-btn '>
						Add
					</button>
				</div>
				<div
					className={`form-alert ${
						formStatus.formSuccess
							? 'alert-success'
							: 'alert-danger'
					}`}
				>
					{formStatus.formMsg}
				</div>
			</form>
			<section className='tasks-container'>
				{isLoading ? (
					<p className=' loading'></p>
				) : (
					<>
						<div className='tasks'>
							{tasks.length === 0 ? (
								<h3>no tasks found</h3>
							) : (
								<>
									{tasks.map((task, i) => {
										return (
											<div key={task.id}>
												<div
													className={`single-task ${
														task.completed &&
														'task-completed'
													}`}
												>
													<h5>
														<span>
															<i className='far fa-check-circle'></i>
														</span>
														{task.task_name}
													</h5>
													<div className='task-links'>
														{/* <!-- edit link --> */}
														<Link
															to={`/edit/${task.id}`}
															className='edit-link'
														>
															<i className='fas fa-edit'></i>
														</Link>
														{/* <!-- delete btn --> */}
														<button
															onClick={() => {
																handleDelete(
																	task.id
																);
															}}
															type='button'
															className='delete-btn'
														>
															<i className='fas fa-trash'></i>
														</button>
													</div>
												</div>
											</div>
										);
									})}
								</>
							)}
						</div>
					</>
				)}
			</section>
		</>
	);
}
export default Home;

{
	/* <TaskList key={i} task={task} />; */
}
