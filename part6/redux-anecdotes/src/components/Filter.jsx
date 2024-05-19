import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilterOnChange = (event) => {
    const filter = event.target.value
    dispatch(filterChange(filter))
  }

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        filter<input type="text" onChange={handleFilterOnChange} />
      </div>
    </div>
  )
}

export default Filter