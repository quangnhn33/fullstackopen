const Part = ({ part, exercises }) => (
    <p>{part} {exercises}</p>
)
const Content = ({ parts }) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
)

export default Content