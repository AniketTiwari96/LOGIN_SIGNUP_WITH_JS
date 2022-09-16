const fs=require('fs');
const input=require('readline-sync');

console.log('What do you want to choice ');
console.log('\npress 1 for sign up\npress 2 for log in\npress 3 for break\n');
const cheakgmail=()=>{
    const email=input.question('Please enter your gmail id => ');
    if(email.includes('@') && email.includes('gmail.com')){
        console.log('Your gmail id is right ;');
        return email;
    }else {
        console.log('\nYour gmail is not right\nPlease enter your gmail id\n');
        return cheakgmail();
    }
}
const passd=()=>{
    const array=['@','#','$','&','*','?','/','^',1,2,3,4,5,6,7,8,9,0];
    const password=input.question('Please enter your Password => '); 
    for( err of array){
        if(password.length=='8' && password.includes(err)){
            console.log('Your password is right ');
            return password;
        }
        else{
            console.log('\nYour password is not strong\nPlease enter your strong password\n');
            return passd();
        }
    }
}
const Sign_up=()=>{
    if(fs.existsSync('data.txt')){
        const data=fs.readFileSync('data.txt','utf-8');
        console.log(data);
        const email=cheakgmail();
        if (data.includes(email)){
            console.log('Your gmail id allready have ');
        }else {
            let user_id=input.question('Please enter your user id => ');
            let full_name=input.question('Enter your full Name => ');
            const password1=passd();
            fs.appendFileSync('data.txt',`[${email},${user_id},${full_name},${password1}]\n`);
            console.log('your data is done ');
        }
    }else{
        fs.createWriteStream('data.txt');
        console.log('Your file is created ');
        Sign_up();
    }
}
const Log_in=()=>{
    const data=fs.readFileSync('data.txt','utf-8');
    console.log(data);
    const email=cheakgmail();
    const password= passd();
    if(data.includes(email) && data.includes(password)){
        console.log('Your login Successfully ');
    }else{
        console.log('Your email id is not right\nPlease enter your right gmail id ');
        Log_in();
    }
}
const choice=input.questionInt('Please enter your choice => ');
if( choice === 1 ){
    Sign_up();
}else if ( choice === 2 ){
    Log_in();
}else if ( choice === 3 ){
    console.log('Your program is sopted ');
    process.exit();
}