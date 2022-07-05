import styles from './PostForm.module.css';
import PostContainer from 'components/PostContainer';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postValidation } from 'utils/validationSchemas.utils';

const PostForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const { formState, watch, handleSubmit, register } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;

  useEffect(() => {
    setResponseErrorMsg([]);
  }, []);

  const onSubmit = async (formData) => {
    setResponseErrorMsg([]);
    setLoading(true);
    console.log(formData);
    setLoading(false);
    // createPost(formData)
    //   .catch((err) => setResponseErrorMsg(err))
    //   .finally(() => setLoading(false));
  };

  return (
    <PostContainer>
      <form
        className={styles.PostForm}
        onSubmit={handleSubmit(onSubmit)}
      ></form>
    </PostContainer>
  );
};

export default PostForm;
