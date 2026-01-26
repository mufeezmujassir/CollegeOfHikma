import React,{useState,useEffect} from 'react'

const Results = () => {
    const [showResulFields, setShowResultFields] = useState(true);
  return (
    <div className='container'>
       {showResulFields &&(
         <div className='container-body'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Results</h1>
                </div>
            </div>
            <form>
                <div className='row'>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor="studentName">Student Name</label>
                            <input type="text" className='form-control' id="studentName" />
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary'>Search</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
       )}

      
    </div>
  )
}

export default Results

