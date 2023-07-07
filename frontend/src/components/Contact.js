import React from 'react';

const Contact = () => {
    return (
        <div className='container mt-3 p-3 d-flex align-items-center justify-content-center' >
            <div className='p-3' style={{boxShadow: "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px"}}>
                <h2> Contact Us With Your Query</h2>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Name</label>
                    <input type="text" className="form-control" id="text" placeholder="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Issue Regarding?</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Issue"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Your Query</label>
                    <textarea className="form-control" id="text" rows="3"></textarea>
                </div>
                <button className=" btn btn-primary">Submit</button>
            </div>
        </div>
    );
};

export default Contact;
