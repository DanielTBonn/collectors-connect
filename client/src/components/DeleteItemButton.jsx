import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_ITEM } from "../utils/mutations";
import { Button } from "react-bootstrap";

const DeleteItemButton = ({ itemId }) => {

    const [ deleteItem, {error}] = useMutation(DELETE_ITEM)
    console.log(itemId)
    const handleDelete = () => {
        const { data } = deleteItem({
            variables: {
                itemId
            }
        })
    }

    return (

        <div>
            <Button onClick={() => handleDelete()} >Delete Item</Button>
        </div>
    )
}

export default DeleteItemButton;