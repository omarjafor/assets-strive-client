import useCustomRequest from "../../../../Hooks/useCustomRequest";


const MyCustomRequest = () => {

    const { customRequest, isLoading } = useCustomRequest();
    console.log(customRequest, isLoading);

    return (
        <div>
            My Custom Request Section
        </div>
    );
};

export default MyCustomRequest;