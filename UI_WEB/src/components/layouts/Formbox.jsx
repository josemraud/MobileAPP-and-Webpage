import React, { Component } from "react";

export const Formbox = () => {
  return (
    <form>
      <div className="row">
        <div className="col-md-6 form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="fname"
          />
        </div>
        <div className="col-md-6 form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div className="col-md-12 form-group">
          <label>Mensaje</label>
          <textarea
            className="form-control"
            placeholder="Type your message..."
            name="comment"
            rows={7}
          />
        </div>
      </div>
      <button type="submit" className="btn-custom primary" name="button">
        Send Message
      </button>
    </form>
  );
};
