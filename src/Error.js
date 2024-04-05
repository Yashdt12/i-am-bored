const Error = ({ errorMessage='' }) => {
  return (
    <main>
      <p style={{color: 'indianred', fontSize: '2rem', margin: '1rem'}}>Error! {errorMessage}</p>
    </main>
  );
};

export default Error;