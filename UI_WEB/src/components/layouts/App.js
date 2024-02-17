import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="footer-top">
                <div className="container">
                    <div className="row footer-btn-wrapper">
                        <div className="col-lg-5 footer-widget">
                            <h4>Descarga nuestra APP</h4>
                            <p>Localiza te conecta con el futuro dueño de tu propiedad.</p>
                            <p>Disponible ahora en: </p>
                        </div>
                        <div className="col-lg-6 col-md-12 footer-widget">
                            <div className="footer-btn">
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.applocaliza" className="btn-custom-2 grey"><i className="flaticon-playstore" />Google Play</a>
                                <a target="_blank" href="https://urldra.cloud.huawei.com/dxc97B4hOg" className="btn-custom-2 grey">
                                <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjQiIGhlaWdodD0iNjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2U2N2UyMiI+PHBhdGggZD0iTTY5Ljg3NSwyMS41Yy0xMC45MTEyNSwwIC0xOS4zMjE1Myw5LjUwMTc0IC0xOS4zMjY5LDI2LjkyNzQ5YzAsMTEuMzc4ODggMTcuMjIxMDgsNDAuNTY5MDcgMzIuNDkxNDYsNjYuMTI3MmMwLC02Ni4xNzcgLTEuNjI5OCwtNzMuMzQ0NTYgLTEzLjE2NDU1LC05My4wNTQ2OXpNMTAyLjEyNSwyMS41Yy0xMS43NjA1LDE5LjM3MTUgLTEzLjE2NDU1LDI2Ljg3MjMxIC0xMy4xNjQ1NSw5My4wNTQ2OWMxNS4yNzAzOCwtMjUuNTU4MTIgMzIuNDkxNDYsLTU0Ljc0ODMyIDMyLjQ5MTQ2LC02Ni4xMjcyYy0wLjAwNTM4LC0xNy40MzExMiAtOC40MTU2NSwtMjYuOTI3NDkgLTE5LjMyNjksLTI2LjkyNzQ5ek0zMi4yNSw0M2MtMTYuMDEyMTIsMTEuMTc0NjMgLTEwLjc0NTEzLDM3LjYyNzI3IC0yLjY2NjUsNDYuMjY0ODljNS4zMzczOCw1LjU5IDI2LjA0Nzc1LDE1LjY1NTExIDQ1LjY2NjUsMjguOTg1MTF6TTEzOS43NSw0M2wtNDMsNzUuMjVjMTkuNjE4NzUsLTEzLjMzIDQwLjMyOTEzLC0yMy4zOTUxMSA0NS42NjY1MSwtMjguOTg1MTFjOC4wNzg2MiwtOC42Mzc2MiAxMy4zNDU2MiwtMzUuMDkwMjcgLTIuNjY2NTEsLTQ2LjI2NDg5ek0xMC43NSw4NmMwLjI1OCwyOS43ODgyNSAxOC40NDA1MywzNy42MjUgMzAuNzI3NzgsMzcuNjI1aDMwLjcxNzI5ek0xNjEuMjUsODZsLTYxLjQ0NTA3LDM3LjYyNWgzMC43MTcyOWMxMi4yODcyNSwwIDMwLjQ2OTc4LC03LjgzNjc1IDMwLjcyNzc4LC0zNy42MjV6TTI3LjUwNDg4LDEyOWMxLjcxNDYyLDguODkwMjUgNS41OTA3NiwxNi4xMjUgMTYuNzY1MzgsMTYuMTI1YzExLjE3NDYyLDAgMjEuOTgwMDYsLTYuNDUgMjcuOTI0ODEsLTE2LjEyNXpNOTkuODA0OTMsMTI5YzUuOTQ0NzUsOS42NzUgMTYuNzUwMTgsMTYuMTI1IDI3LjkyNDgxLDE2LjEyNWMxMS4xNzQ2MiwwIDE1LjA1MDc2LC03LjIzNDc1IDE2Ljc2NTM4LC0xNi4xMjV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" width="25"/>
                                App Gallery</a>
                                <a target="_blank" href="https://google.com" className="btn-custom-2 grey"> <i className="flaticon-apple" />App Store</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;