import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';


const DeclinedChange = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var url = `${process.env.REACT_APP_API_HOST}/fetch-decline-change`

  var heading = [
    'Request ID',
    'Requester',
    'Change Name',
    'Change Description',
    'Date',
    '',

  ];

  const getDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(url);
      console.log(response.data)
      setData(response.data.responseData);
      setIsLoading(false);
    };
    loadData()
  }, [url])

  return (
    <div>
      <div>
        <div className='m-3 text-lg font-bold'>Declined Change Request</div>
        {isLoading
        ?
        <div className='flex justify-center items-center h-96'>
          <DotLoader color="hsla(148, 83%, 53%, 1)" />
        </div>
        :
        <table className='mt-5 w-full'>
          <thead>
            <tr className=' text-dark-1 border-b text-sm'>
              {heading.map((head) => (
                <th>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className=' text-center text-xs ' key={data.guid}>
            {data
              .sort((a, b) => b.changeRequestId > a.changeRequestId ? 1 : -1)
              .map((change) => {
                return (<>
                  <tr>
                    <td>{change['changeRequestId']}</td>
                    <td>{change['changeUsername']}</td>
                    <td>{change['changeName']}</td>
                    <td>{change['changeDescription']}</td>
                    <td>{getDate(change['createdAt'])}</td>
                  </tr>
                </>
                )
              }
              )
            }
          </tbody>
        </table>
      }
      </div>
    </div>
  )
}

export default DeclinedChange