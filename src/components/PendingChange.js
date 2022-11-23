import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import DetailsModal from './modals/DetailsModal';
import NewChangeModal from './modals/NewChangeModal';
import ReactPaginate from 'react-paginate';

const PendingChange = () => {

  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guid, setGuid] = useState("");
  const [changeRequestId, setChangeRequestId] = useState("");
  const [username, setUsername] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [base64String, setBase64String] = useState("");
  // const [sortState, setSortState] = useState("none");
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  // const sortMethods = {
  //   none: { method: (a, b) => null },
  //   descending: { method: (a, b) => (a > b ? -1 : 1) },
  // };



  var url = `${process.env.REACT_APP_API_HOST}/change-request`

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


  const confirmDeleteRequest = async (id) => {
    await swal({
      title: "Are you sure you want to delete this request?",
      text: "You will not be able to recover this request!",
      type: " warning ",
      showCancelButton: true,
      dangerMode: true,
      buttons: ["Cancel", "Delete"],
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then(async (e) => {
      if (e === true) {
        /// Call the delete endpoint if the user click the "OK" button
        await deleteRequest(id)
      } else {
        /// Close the modal without doing anything....
      }
    }).catch((_) => {
      //TODO: Inform the user about the error that occured!.
    })
    //  }

  };


  const deleteRequest = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_HOST}/change-request`,
      {
        data: { 'username': JSON.parse(localStorage.getItem('email')), 'changeRequestId': id },
      }
    ).then(response => {
      if (response.status === 200) {
        window.location.reload()
      }
    })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  // const editRequest = () => {
  //   setEdit(true)
  // }


  const clear = (detailsId) => {
    const details = [...data];

    const index = data.findIndex((detail) => detail.guid === detailsId);
    details.splice(index, 1)
    setData(details);
  }

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(url);
      console.log(response.data)
      setData(response.data.responseData);
      setIsLoading(false);
    };
    loadData()
  }, [url])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));

  }, [itemOffset, itemsPerPage, data])

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset)

  }



  return (
    <div className=''>
      <div className='m-3 text-lg font-bold'>Pending Change Request</div>

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

          <tbody className=' text-center text-xs'>
            {currentItems
              .sort((a, b) => b.changeRequestId > a.changeRequestId ? 1 : -1)
              .map((change) => {
                return (<>
                  <tr>
                    <td>{change['changeRequestId']}</td>
                    <td>{change['changeUsername']}</td>
                    <td>{change['changeName']}</td>
                    <td>{change['changeDescription']}</td>
                    <td>{getDate(change['createdAt'])}</td>
                    <td>
                      <button
                        className='bg-primary-light p-1 rounded-md my-2'
                        onClick={_ => {
                          setFileExtension(change["fileExtension"])
                          setBase64String(change["base64String"])
                          setChangeRequestId(change["changeRequestId"])
                          setUsername(change['changeUsername'])
                          setGuid(change["guid"])
                          setClick(true)
                        }
                        }
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className=' bg-danger-3 p-1 rounded-md my-2'
                        onClick={_ => {
                          confirmDeleteRequest(change["changeRequestId"])
                        }
                        }
                      >
                        Delete
                      </button>
                    </td>
                    {/* <td>
                      <button
                        className=' bg-gray-2 p-1 rounded-md my-2'
                        onClick={_ => {
                          editRequest(change["changeRequestId"])
                        }
                        }
                      >
                        Edit
                      </button>
                    </td> */}
                    {/* <td>
                      <Dropdown
                        guid={change["guid"]}
                        requestId={change["changeRequestId"]}
                      />
                    </td> */}
                  </tr>
                </>
                )
              })
            }

          </tbody>
        </table>
      }
      <ReactPaginate
        previousLabel={'<<'}
        breakLabel={"..."}
        nextLabel={'>>'}
        pageCount={pageCount}
        pageRangeDisplayed={"5"}
        onPageChange={handlePageClick}
        containerClassName={"isolate flex justify-center -space-x-px rounded-md shadow-sm mt-10"}
        pageLinkClassName={"relative z-10 inline-flex items-center border border-primary bg-white-50 hover:bg-primary hover:text-white active:bg-primary px-4 py-2 text-sm font-medium text-primary focus:z-20"}
        breakLinkClassName={"relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"}
        previousLinkClassName={"relative inline-flex items-center hover:bg-primary hover:text-white rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"}
        nextLinkClassName={"relative inline-flex items-center hover:bg-primary hover:text-white rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"}
        activeLinkClassName={""}

      />
      <DetailsModal
        clear={clear}
        base64String={base64String}
        fileExtension={fileExtension}
        guid={guid}
        changeRequestId={changeRequestId}
        username={username}
        key={`DetailsModal-${click}`}
        show={click}
        toggle={_ => setClick(!click)}
      />
      {/* <Step1
        key={`Step1-${edit}`}
        show={edit}
        toggle={_ => setEdit(!edit)}
      /> */}
      <NewChangeModal
        key={`NewChangeModal-${edit}`}
        show={edit}
        toggle={_ => setEdit(!edit)}
      />

    </div>
  )
}

export default PendingChange