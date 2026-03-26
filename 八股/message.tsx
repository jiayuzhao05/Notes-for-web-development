import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import {MouseEvent} from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCalendarFill } from "react-icons/bs";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";

//pascalcasing
function Message() {
    //JSX: JavaScript XML
    const name = "Mosh";
    return <h1>Hello {name}</h1>;
}

export default Message;
//virtual dom: div-> h1 (app-> message)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

//framework: react, angular, vue
//library: lodash, moment
//react18: react-dom
function ListGroup() {
    let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
    items = [];
    const handleClick = (event: MouseEvent) => {
        console.log(event);
    }
    let selectedIndex = 0;
    //hook: useState
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [name, setName] = useState(""); 
    arr[0]  //variable
    arr[1]  //updater function

    return (
        <>
        <h1>List</h1>
        {items.length === 0 ? <p>No item found</p> : null}
        {items.length === 0 && <p>No item found</p>}
        <ul className="list-group">
            {items.map((item) => (
                <li className="list-group-item" key={item} onClick={() => console.log("clicked")}
        >
            {item}
        </li>
    ))}
    </ul>
    </> 
    )


    <h1>List</h1>
    return <ul className="list-group">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
    </ul>
}

export default ListGroup;


interface Props {
    children: string;
    onClose: () => void;
}

const Alert = ({children, onClose}: Props) => {
    return (
        <div className="alert alert-primary alert-dismissible">
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
        </div>
    )
}

export default Alert;

function Alert() {
    useState(false);
    return (
        <Alert onClose={() => console.log("close")}>
            Hello World
        </Alert>
    )
}


interface Props {
    children: string;
    color?: "primary" | "secondary" | "danger";
    onClick: () => void;
}

const Button = ({ children, color, onClick }: Props) => {
  return (
    <button
      className={[styles.btn, styles['btn-' + color]].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
};




function Icon() {
    <div>
    return <BsFillCalendarFill color="red" size={100}/>
    </div>
}



//heart
const Like = ({onClick}: Props) => {
    const [status, setStatus] = useState(false);

    if (status) return <AiFillHeart color="#ff6b81" size={100} onClick={() => setStatus(false)}/>
    return(
      <AiFillHeart color="red" size={100}  onClick={() => setStatus(true)}/>
    )
}

export default Like;

//shopping cart
import { useCart } from "react";

function App() {
  const [cartItems, setCart] = useState(['Product1', 'Product2', 'Product3']);
  const [drink, setDrink] = useState({title: 'Coke', price: 10});
  const handleClick = () => {
    const newDrink = {title: 'Pepsi', price: 15};
    setDrink(newDrink);
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
    </div>
  )
//expandable text
  return (
    <div>
        <ExpandableText maxChars = 10>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </ExapndableText>
    </div>
  )

  interface Props {
    maxChars: number;
    children: string;
  }
  const ExpandableText = ({ maxChars = 100, children }: Props) => { 
    const [isExpanded, setIsExpanded] = useState(false);
    if (children.length <= maxChars) return <p>{children}</p>;
    const summary = isExpanded ? children : children.substring(0, maxChars);
    return <p>{summary}...<button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Less' : 'More'}</button></p>;
}

export default ExpandableText;

//NavBar
interface Props {
    cartItemsCount: number;
}

const NavBar = ({cartItemsCount}: Props) => {
    return <div>NavBar: {cartItemsCount}</div>
};

export default NavBar;


//cart
interface Props {
    cartItems: string[];
    onClear: () => void;
}

const Cart = ({cartItems, onClear}: Props) => {
    return (
        <>
        <div>Cart</div>
        <ul>
            {cartItems.map(item => <li key={item}>{item}</li>)}
        </ul>
        <button onClick={onClear}>Clear</button>
        </>
    )



//Form
import React from "react";
//validation libs:joi, yup, zod
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters"}),
    age: z.number( invalid_type_error: 'Age field is required' ).min(18, {message: "Age must be at least 18"}),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    {...register("name")}
                />
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
};


//Expense Form
const ExpenseForm = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input id="description" type="text" className="form-control" />
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input id="amount" type="number" className="form-control" />
                </div>
            </div>
        </form>
    )
}


//expenselist
interface Expense {
    id: number;
    description:string;
    amount:number;
    category:string;
}
interface Props {
    expenses:Expense[];
    onDelete: (id:number) => void;
}
const ExpenseList = ({expenses}: Props) => {
    return(
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>${expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</td>
                    <td>
                        <button className="btn btn-outline-secondary">Clear</button>
                    </td>
                </tr>
            </tfoot>
                {expenses.map(expense => <tr key={expense.id}></tr>)}
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button className="btn btn-outline-danger" onClick={() => onDelete(expense.id)}>Delete</button></td>                
                </tr>
            </tbody>
        </table>
    )
}
}
}


function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expenses, setExpenses] = useState<Expense>[
        { id: 1, description: 'aaa', amount: 10, category: 'Groceries' },
        { id: 2, description: 'bbb', amount: 10, category: 'Utilities' },
        { id: 3, description: 'ccc', amount: 10, category: 'Entertainment' },
    ]>([]);
    const visibleExpenses = selectedCategory ? expenses.filter(e => e.category === selectedCategory) : expenses;

    return (
        <div>
          <div className="mb-5">
            <ExpenseForm onsubmit={data => setExpenses([...expenses, {...data, id: expenses.length + 1}])} />
          </div className="mb-3">
            <ExpenseForm onSubmit={expense => setExpenses([...expenses, expense])} />


const Form = () => {
    const nameRef = useRef<HTMLInoutElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const person = {name: '', age: 0};
    useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (nameRef.current !== null)
            console.log(nameRef.current.value);
        if (ageRef.current !== null)
            console.log(ageRef.current.value);
    }
    
    
    
    </HTMLInoutElement>