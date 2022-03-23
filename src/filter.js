const ChartFilter = props => {
  const { filterLabel, options, handleChange } = props;

  return (
    <div>
      <label htmlFor="topics-selection">Filter by {filterLabel}: </label>
      <select id="topics-selection" onChange={e => handleChange(e)}>
        <option value="All">Show All</option>
        {options.map(option => {
          return <option key={option} value={option}>{option}</option>
        })}
      </select>
    </div>
  )
}

export default ChartFilter;