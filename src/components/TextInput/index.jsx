import './styles.css'
 export function Input ({searchValue, handleChange, }) {
    return (
        <input 
        value={searchValue}
        onChange={handleChange} 
        placeholder={'digite uma palavra '}
        type={'search'} /> 
        
    )
}

