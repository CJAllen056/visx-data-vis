const ChartFilter = props => {
  const { options, handleChange } = props;

  return (
    <div>
      <label htmlFor="topics-selection">Filter by topic: </label>
      <select id="topics-selection" onChange={e => handleChange(e)}>
        <option value="All">Show All</option>
        {options.map(topic => {
          return <option key={topic.label} value={topic.label}>{topic.label}</option>
        })}
      </select>
    </div>
  )
}

export default ChartFilter;