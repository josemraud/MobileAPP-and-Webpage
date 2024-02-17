import React, { useContext, useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { UserService } from '../../../service/UserService';
import Swal from "sweetalert2";
export const Content = () => {
    const userservice = new UserService();
    const user = localStorage.getItem("user");
    
    const [id, setidd] = useState([]);
    const [formPass, setNewpass] = useState({
        new_password: "",
        current_password: "",
    });
    const {new_password, current_password} = formPass;
    const getUser = () => {
        userservice.getUser(user).then(({ data }) => {
        
          const us = data.map((us) => {
            return {
              id: us.id_usuario,
            };
          });
            setidd(us);
        });
      };
      useEffect(() => {
        getUser();
      }, [user]);

      const handleOnChange = ({ target }) => {
        setNewpass({
          ...formPass,
          [target.name]: target.value,
        });
      };
      const handleSubmit = async (event) => {
        
        event.preventDefault();
       
        console.log(id[0].id)
      await userservice
      .newPassword(formPass,id[0].id)
            .then((resp) => {
              if (resp.code === 200) {
                Swal.fire("Contraseña Actualizada!", resp.msg, "success");
              } else {
                Swal.fire(
                  "Error al registrar Usuario!",
                  console.log(JSON.stringify(resp.msg)),
                  "error",
                );
                
              }
            })
            .catch((error) => {
              Swal.fire("Error", error.msg, "error");
           
            });
      }
    return (
        <>
              <div className="card">
                <h5>Cambio de contraseña</h5>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <Password placeholder="Contraseña antigua" value={current_password}  autoComplete="off"onChange={handleOnChange} name="current_password"  toggleMask />
                        </div>
                    </div>
                    </div>
                    <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <Password placeholder="Nueva contraseña"value={new_password}  autoComplete="off"onChange={handleOnChange} name="new_password" toggleMask/>
                        </div>
                    </div>
                    </div>

                    <button
            type="submit"
            className="btn-custom secondary btn-block"
            onClick={handleSubmit}
            //disabled={!allOk()}
          >
            Cambiar Contraseña
          </button>
                    </div>
        </>
    )
}
export default Content;