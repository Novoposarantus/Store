import $ from 'jquery';
import {postRequest} from '../../request';
import {Config} from '../../../../config';
import './login.css';

export function renderLogin(place, logined){
    let $place = $(place);

    $place.html(
        `
        <h2 class="text-center">Login in your account</h2>
        <form calss="form-group"">
            <label>Login</label>
            <input type="text" key="login" class="form-control"">
            <label>Password</label>
            <input type="password" key="password" class="form-control"">
            <button type="button" id="submit" class="btn btn-success">Submit</button>
        </form>
        <button type="button" id="register" class="btn">
            Or create new Account
        </button>
        `
    )
    let form = {
        login: '',
        password: ''
    }
    place.find('input')
    .on('input',(event)=>{
        let $target = $(event.target);
        form[$target.attr('key')] = $target.val();
    })
    place.find('#submit').click(async ()=>{
        try{
            let response = await postRequest(Config.login,form);
            localStorage.setItem('user-token', response.access_token);
            logined(response.permissions);
            
        }catch(e){
            localStorage.removeItem('user-token');
        }
    })
}