import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload } from './upload';

const SimpleUpload = () => {
  return <Upload
    action="https://run.mocky.io/v3/42d3c016-7aef-4e57-8f4d-4c357f27b910"
    onProgress={action('progress')}
    onSuccess={action('success')}
    onError={action('error')}
  ></Upload>
}
storiesOf('Upload Component', module)
  .add('Upload', SimpleUpload)