import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_SINGLE_ITEM } from "../utils/queries";
import { EDIT_ITEM } from "../utils/mutations";
import { Container, Col, Form, Button, Row } from 'react-bootstrap';


const EditSingleItem = () => {
    const { itemId } = useParams();
    const [editItem, { error }] = useMutation(EDIT_ITEM);
    const { loading: userLoading, data} = useQuery(GET_SINGLE_ITEM, {
        variables: {
            itemId
        }
    });


    const item = data?.singleItem || {}
    console.log(item)


    const [itemData, setItemData] = useState({
        itemName: '',
        itemDescription: '',
    });

    useEffect(() => {

        setItemData({
            itemName: item.itemName,
            itemDescription: item.itemDescription
        })
        console.log(itemData)
    }, [item])

    const handleInputChange = (e) => {
        console.log(e.target)
        const { name, value } = e.target;
        console.log(name, value)
        setItemData({
          ...itemData,
          [name]: value,
        });
      };

      const handleItemEdit = (e) => {
        e.preventDefault();

        if (!itemData.itemName) {
            alert('Item needs a name!')
            return;
        }

        if (!itemData.itemDescription) {
            alert('Item needs a description!')
            return;
        }

        try {
            const { data } = editItem({
                variables: {
                    ...item,
                    itemId: item._id,
                    ...itemData
                }
            })
        } catch (err) {
            console.log("There was an error.")
            console.log(err)
        }
      }

      return ( 
        <div className="TestPage">
          <div>
            { userLoading ? (
              <p>Loading User...</p>
              ):
              <div>
                        <Container>
          <h1>Add a Collection!</h1>
          <Form 
          // onSubmit={handleFormSubmit}
          >
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="itemName"
                  value={itemData.itemName}
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  size="lg"
                  placeholder="Set a collection name"
                />
                <Form.Control
                  name="itemDescription"
                  value={itemData.itemDescription}
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  size="lg"
                  placeholder="Set a collection description"
                />
                {/* <Form.Control
                  name="fileInput"
                  onChange={handleFileChange}
                  type="file"
                  size="lg"
                /> */}
                
              </Col>
              <Col xs={12} md={4}>
                <button  size="lg" onClick={(e) => {
                  // console.log(file)
                  handleItemEdit(e);
              }}>
                  Upload
                </button>
              </Col>
            </Row>
          </Form>
        </Container>
                  {/* <input type="file" onChange={handleFileChange} /> */}
                  {/* <input className="collections"> </input>
                  <button >Upload</button> */}
              </div>
            }
          </div>
        </div>
      )
}

export default EditSingleItem;