import React from 'react'

const DisplayPost = (props) => {
  const {logo, image, prompt, user} = props.post;

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img 
      className='w-full h-auto object-cover rounded-xl' 
      src={image} 
      alt={prompt} 
      />

      <div className={"transform group-hover:flex flex-col opacity-0 max-h-[94.5%] transition duration-500 hover:opacity-95 hidden absolute bottom-0 left-0 right-0 bg-[#fff] m-2 p-4 rounded-md"}>
          <div className="d-flex">
            <img className='logo mr-2' src={logo} alt={prompt} />
            <div >
              <span style={{color: "#888",fontSize: "12px", textTransform: "lowercase"}}>{user}</span>
              <div className='overflow'>
                <p className='inline-block' style={{"fontSize": "14px"}}>{prompt}</p>

              </div>
            </div>
          </div>
      </div>

    </div>
  )
}

export default DisplayPost