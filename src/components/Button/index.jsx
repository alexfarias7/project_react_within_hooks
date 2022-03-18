import './styles.css';

function Button ({children, onClick, disabled }){
    return (
        <button className='button' onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export {Button}