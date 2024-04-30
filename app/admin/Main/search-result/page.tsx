import React from 'react';

function Searchresult(props: any) {
  const searchPerformed = props.data1
  const searchResult = props.data2
  const inputValue = props.data3

  return (
    <div>
      {searchPerformed && !searchResult && <p>No user found id {inputValue}</p>}
      {searchPerformed && searchResult && (
        <div>
          <h2>Search Result:</h2>
          <p>ID: {searchResult?.id}</p>
          <p>Name: {searchResult?.name}</p>
          <p>Email: {searchResult?.email}</p>
          <p>Number: {searchResult?.number}</p>
          <p>Role: {searchResult?.role}</p>
          <img src={`http://localhost:4000/admin/profilePic/${searchResult?.path}`} alt="No image found" className="mt-4 w-24 h-24" />
        </div>
      )}
    </div>
  );
}

export default Searchresult;
