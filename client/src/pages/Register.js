import {useEffect, useState} from 'react';
import { FormRow, Alert} from '../components/dashboard';
import Wrapper from '../assets/wrappers/RegisterPage';
import {useAppContext} from "../context/user_context";
import {useNavigate} from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true

};

function Register() {
    const {user} = useAppContext();
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const {
        isAdmin,
        isLoading,
        setupUser,
        showAlert,
        displayAlert,
    } = useAppContext();
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                isAdmin ? navigate('/admin') : navigate('/');
            }, 2000);
        }

    }, [user, navigate]);


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    };
    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember}); // toggle

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password, isMember} = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = {name, email, password};
        if (isMember) {
            setupUser({currentUser, endPoint: 'login', alertText: 'Login Successful ! Redirecting to home page...'})
        } else {
            setupUser({currentUser, endPoint: 'register', alertText: 'User created !'});
        }


    }


    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                {values.isMember ? <h3>Login</h3> : <h3>Register</h3>}
                {showAlert && <Alert text='alert registerds'/>}
                {!values.isMember &&
                    <FormRow type='text' name='name' value={values.name} handleChange={handleChange}/>}
                <FormRow type='email' name='email' value={values.email} handleChange={handleChange}/>
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange}/>

                <button type='submit' className='btn hero-btn' disabled={isLoading}>
                    submit
                </button>
                <p>
                    {values.isMember ? 'need to register' : 'already a member'}
                    <button type="button" onClick={toggleMember}
                            className="member-btn">{values.isMember ? 'Register' : 'Login'}</button>

                </p>
            </form>
        </Wrapper>
    );

}

export default Register;