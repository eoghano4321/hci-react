
import axios from 'axios';
import NavBar from './components/NavBar';
import { Component } from 'react';
import './Admin.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], // Initialize users state as an empty array
            courses: [
                { id: 1, name: 'Mathematics', spaces: 30 },
                { id: 2, name: 'Physics', spaces: 25 },
                { id: 3, name: 'Biology', spaces: 20 },
                { id: 4, name: 'Chemistry', spaces: 35 },
            ]
        };
    }

    

    handleDelete = (id) => {
        this.setState(prevState => ({
            courses: prevState.courses.filter(course => course.id !== id)
        }));
        
    };

    handleChangeSize = (id, newSize) => {
        this.setState(prevState => ({
            courses: prevState.courses.map(course => course.id === id ? { ...course, spaces: newSize } : course)
        }));
    };

    getUsers = async () => {
        // Get all users from the server
        try {
            const response = await axios.get('https://71ob5e7fj1.execute-api.us-east-1.amazonaws.com/beta/users');
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
            await axios.post('https://71ob5e7fj1.execute-api.us-east-1.amazonaws.com/beta/remove', { email: userEmail});

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
                <section className="admin-container">
                    <h1>Admin Page</h1>
                    <p>Only admins can see this page.</p>
                    <div className="user-list">
                        <h2>Users</h2>
                        <table className='users-table'>
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
                    </div>
                    <div className="course-list">
                        <h2>College Courses</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Available Spaces</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.name}</td>
                                        <td>{course.spaces}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={course.spaces}
                                                onChange={(e) => this.handleChangeSize(course.id, parseInt(e.target.value))}
                                            />
                                            <button onClick={() => this.handleDelete(course.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </section>
            </>
        );
    }
}

export default Admin;