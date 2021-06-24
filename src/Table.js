import React, { useState, useEffect } from 'react';

const Table = () => {
	const [data, setData] = useState([])
	const [textInput, setTextInput] = useState('')
	const [filterData, setFilterData] = useState([]) 

	useEffect(() => {
		fetch("https://api.publicapis.org/categories")
		.then(res => res.json())
		.then(result => {
			setFilterData(result)
			setData(result)
		})
	}, [])

	useEffect(() => {
		if (textInput && textInput !== '') {
			const item = data.filter(arr => { return arr.toLowerCase().includes(textInput.toLowerCase())})
			return setFilterData(item)
		}
		return setFilterData(data)
	}, [textInput])

	const handleText = (e) => {
		setTextInput(e.target.value)
	}

	const DataTable = () => {
		if (data && filterData) {
			return filterData?.map((val, index) => {
				return (
					<div key={index} style={{ display: 'block' }}>
						{val}
					</div>
				)
			})
		}
		return <div></div>
	}

	return (
		<div>
			<form>
				<label>Filter: </label>
				<input type="text" value={textInput} onChange={handleText} style={{ marginBottom: '10px' }}  />
			</form>
			<DataTable />
		</div>
	)
}

export default Table;