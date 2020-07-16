import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";


    const initialItem ={
        id: null,
        title: '',
        director: '',
        metascore: null,
        stars: [],
    };

const UpdateForm=(props)=>{
      const { push } = useHistory();
    const [update, setUpdate] = useState(initialItem);
    const {id} = useParams();
    useEffect(()=>{
        axios
            .get(`http://localhost:3000/movies/${id}`)

            .then(res=>{
                console.log(res);
                setUpdate(res);
            })
            .catch(err=> console.log(err));
    }, [id]);


    const changeHandler = (e)=>{
        setUpdate({
            ...update, [e.target.name]:e.target.value
        })
        console.log(update);
    }

    const updateData=(e)=>{
        axios
            .put(`http://localhost:3000/${id}`, update)
            .then(res=>{
                console.log(res);
                props.setMovieList(res.data);
                push (`/movies/${id}`)
            })
            .catch(err=>console.log(err));
    };

    return(
        <div>
            <form onSubmit={updateData}>
                <input
                type='text'
                name='title'
                id='title'
                value={update.title}
                onChange={changeHandler}
                />
                 <input
                type='text'
                name='director'
                id='director'
                value={update.director}
                onChange={changeHandler}
                />
                 <input
                type='text'
                name='metascore'
                id='metascore'
                value={update.metascore}
                onChange={changeHandler}
                />
                 <input
                type='text'
                name='stars'
                id='stars'
                value={update.stars}
                onChange={changeHandler}
                />
                 
            </form>
            <button>Update</button>
        </div>
    );
};
export default UpdateForm;
