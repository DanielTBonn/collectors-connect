import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';



const MyPage = () => {
    const [userData, setUserData] = useState({});
}