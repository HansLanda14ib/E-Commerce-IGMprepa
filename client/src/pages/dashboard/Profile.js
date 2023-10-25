import {useState} from 'react';
import {FormRow, Alert} from '../../components/dashboard';
import {useAppContext} from '../../context/user_context';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
    const {user, showAlert, displayAlert, updateUser, isLoading} =
        useAppContext();
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email) {
            displayAlert();
            return;
        }

        updateUser({name, email});
    };
    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile </h3>
                {showAlert && <Alert/>}

                {/* name */}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />

                    <FormRow
                        type='email'
                        name='email'
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />

                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Profile;