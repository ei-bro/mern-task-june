import { Link, useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { useEffect, useRef, useState } from 'react';

function EditTask() {
	const { id } = useParams();

	// targeting DOM element
	const pDOM = useRef();
	const inputDOM = useRef();
	const checkDOM = useRef();

	// form alert state
	const [formStatus, setformStatus] = useState({
		formMsg: '',
		formSuccess: true,
	});

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

	async function fetchSingleTask() {
		try {
			const { data } = await axios('/task/' + id);
			console.log(data);
			if (!Array.isArray(data)) {
				formStatusLOgic('No task found', false);
			}
			pDOM.current.textContent = data[0].id;
			inputDOM.current.value = data[0].task_name;
			checkDOM.current.checked = data[0].completed;
		} catch (error) {
			console.log(error);
			formStatusLOgic('something went wrong', false);
		}
	}

	// handleSubmit to edit task

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await axios.patch('/task/' + id, {
				name: inputDOM.current.value,
				completed: checkDOM.current.checked,
			});
			fetchSingleTask();
			formStatusLOgic('Task edited successfully', true);
		} catch (error) {
			console.log(error);
			formStatusLOgic('something went wrong', false);
		}
	}

	useEffect(() => {
		fetchSingleTask();
	}, []);

	return (
		<div className='container'>
			<form onSubmit={handleSubmit} className='single-task-form'>
				<h4>Edit Task</h4>
				<div className='form-control'>
					<label>Task ID</label>
					<p ref={pDOM} className='task-edit-id'></p>
				</div>
				<div className='form-control'>
					<label htmlFor='name'>Name</label>
					<input
						ref={inputDOM}
						type='text'
						name='name'
						className='task-edit-name'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='completed'>completed</label>
					<input
						ref={checkDOM}
						type='checkbox'
						name='completed'
						className='task-edit-completed'
					/>
				</div>
				<button type='submit' className='block btn task-edit-btn'>
					edit
				</button>
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
			<Link to='/' className='btn back-link'>
				back to tasks
			</Link>
		</div>
	);
}
export default EditTask;
