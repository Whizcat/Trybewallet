# Trybewallet 💼

## Project Context 💡

That was my first React project using Redux and Sass.
The application has two pages in its structure, the first being a login page and the second a digital wallet.
On the login page, you must enter a valid
email and password. The email has to be in the format `example@test.com`. The password must have a minimum length of 6 digits.
On the wallet page, there is a form where it is possible to insert data about an expenditure, which will generate columns in the table below with some additional information. In the table, it is also possible to edit or delete expenses. The page has a total balance in BRL which will be increased or decreased based on your expenditure.

Page URL: https://imvictorm.github.io/Trybewallet/

### Acquired Knowledge 📖

In this project, I was able to:

- Create a Redux store;
- Create reducers;
- Create actions in Redux;
- Create dispatchers in Redux;
- Connect Redux to React components;
- Create asynchronous actions in the React application that uses Redux.

Prototype used as reference: https://www.figma.com/file/ibAEAbS7A6EBprCvXJNhbt/%5BProjeto%5D%5BFrontend%5D-TrybeWallet?node-id=0%3A1.


## Used Technologies 🧰
<table>
    <thead>
        <tr>
            <th>HTML5</th>
            <th>CSS3</th>
            <th>SCSS</th>
            <th>JavaScript</th>
            <th>React</th>
            <th>Redux</th>
            <th>Jest</th>
            <th>RTL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" 
                        alt="html5" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" 
                        alt="css3" 
                        width="40" 
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://sass-lang.com/">
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/sass-3521691-2945135.png"
                        alt="scss"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
                        alt="javascript" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" 
                        alt="react" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://redux.js.org" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" 
                        alt="redux" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
             <td align="center">
                <a href="https://jestjs.io" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" 
                        alt="jest" 
                        width="40" 
                        height="40"
                     /> 
                </a>
            </td>
            <td align="center">
                <a href="https://testing-library.com/docs/" target="_blank" rel="noreferrer">
                    <img 
                        src="https://testing-library.com/img/octopus-128x128.png"
                        alt="rtl"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
        </tr>
    </tbody>
</table>

## Running the application ⚙️

1. Clone and enter this repository
```
git clone git@github.com:ImVictorM/Trybewallet.git && cd Trybewallet
```
2. Install the dependencies
```
npm install 
```
3. Start the project
```
npm start
```

## Testing 🛠️
Running all tests:
```
npm test
```
Running a specific test:
```
npm test {test_file_name}
