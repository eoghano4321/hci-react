
import axios from 'axios';
import NavBar from './components/NavBar';
import { Component } from 'react';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [] // Initialize users state as an empty array
        };
    }

    getUsers = async () => {
        // Get all users from the server
        try {
            const response = await axios.get('http://localhost:3001/users');
            this.setState({ users: response.data });
            console.log('Users:', this.state.users);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error getting users:', error);
        }
    }


    componentDidMount() {
        this.getUsers();
    }

    deleteUser = async(userEmail) =>{
        // Delete user with the given userId
        try{
            await axios.post('http://localhost:3001/remove', { email: userEmail});

            // Update the users state
            this.setState({
                users: this.state.users.filter((user) => user.email !== userEmail)
            });

        }
        catch(error){
            console.error('Error deleting user:', error);
        }
    }
    

    render() {
        return (
            <>
                <NavBar />
                <section className="container">
                    <h1>Admin Page</h1>
                    <p>Only admins can see this page.</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => (
                                <tr key={user.email}>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => this.deleteUser(user.email)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </>
        );
    }
}

export default Admin;