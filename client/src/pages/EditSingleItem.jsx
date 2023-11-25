import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_SINGLE_ITEM } from "../utils/queries";
import { EDIT_ITEM } from "../utils/mutations";

const EditSingleItem = () => {
    const { itemId } = useParams();
    const [editItem, { error }] = useMutation(EDIT_ITEM);
    const [loading, data] = useQuery(GET_SINGLE_ITEM, {
        variables: {
            itemId
        }
    })

    

    const [itemData, setItemData] = useState({
        itemName: '',
        itemDescription: '',
    });

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

        if (!itemData.name) {
            alert('Collection needs a name!')
            return;
        }

        if (!itemData.description) {
            alert('Collection needs a description!')
            return;
        }

        try {
            const { data } = editItem({
                variables: {
                    ...itemData
                }
            })
        } catch (err) {
            console.log("There was an error.")
            console.log(err)
        }
      }

      return ( 

      )
}

export default EditSingleItem;