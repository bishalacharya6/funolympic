import React from 'react';

// style={{ backgroundColor: '#393E46', color: '#EEEEEE' }}

const Faq = () => {
  return (
    <div className="container mt-3 p-3">
      <h1 className="mx-2 px-2">FAQ (Frequently Asked Question) </h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item my-3" style={{ backgroundColor: '#393E46', color: '#EEEEEE', borderRadius:"5px" }}>
          <h2 className="accordion-headerm-1 p-2">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ backgroundColor: '#393E46', color: '#EEEEEE' }} >
            What sports events are available for live streaming on FunOlympic?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            FunOlympic offers live streaming for a wide range of sports events, including popular Olympic sports like athletics, swimming, gymnastics, basketball, and more. You can enjoy watching your favorite sports events in real-time.
            </div>
          </div>
        </div>
        <div className="accordion-item my-3" style={{ backgroundColor: '#393E46', color: '#EEEEEE', borderRadius:"5px" }}>
          <h2 className="accordion-header m-1 p-2">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={{ backgroundColor: '#393E46', color: '#EEEEEE' }}>
            How can I access the live streaming on FunOlympic?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            Accessing the live streaming on FunOlympic is easy. Simply visit our website and navigate to the live streaming section. From there, you can choose the sport or event you want to watch and enjoy the live action.
            </div>
          </div>
        </div>
        <div className="accordion-item my-3" style={{ backgroundColor: '#393E46', color: '#EEEEEE', borderRadius:"5px" }}>
          <h2 className="accordion-header m-1 p-2">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={{ backgroundColor: '#393E46', color: '#EEEEEE' }}>
            Are the live streaming services on FunOlympic free?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            Yes, FunOlympic provides free live streaming services. You can watch your favorite sports events without any subscription fees. However, please note that certain premium features or exclusive content may require a paid subscription.
            </div>
          </div>
        </div>
        <div className="accordion-item my-3" style={{ backgroundColor: '#393E46', color: '#EEEEEE', borderRadius:"5px" }}>
          <h2 className="accordion-header m-1 p-2">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" style={{ backgroundColor: '#393E46', color: '#EEEEEE' }}>
            Can I watch replays of past sports events on FunOlympic?
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            Absolutely! FunOlympic offers replays of past sports events, allowing you to catch up on any missed action. Our extensive library of replays ensures that you don't miss out on the thrilling moments from your favorite sports.
            </div>
          </div>
        </div>
        <div className="accordion-item my-3" style={{ backgroundColor: '#393E46', color: '#EEEEEE', fontWeight: 'bold', borderRadius:"5px" }}>
          <h2 className="accordion-header m-1 p-2">
            <button className="accordion-button btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" style={{ backgroundColor: '#393E46', color: '#EEEEEE', fontWeight: 'bold'  }}>
            Is FunOlympic available on mobile devices?
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            Yes, FunOlympic is designed to be mobile-friendly. You can access our website and enjoy live streaming and replays on your smartphone or tablet. Simply visit our website using your mobile browser, and the responsive design will ensure an optimal viewing experience.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
