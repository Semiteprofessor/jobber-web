import { ChangeEvent, FC, KeyboardEvent, ReactElement, useState } from 'react';
import { ITagsInputProps } from 'src/features/gigs/interfaces/gig.interface';
import TextInput from 'src/shared/inputs/TextInput';
import { v4 as uuidv4 } from 'uuid';

const TagsInput: FC<ITagsInputProps> = (props): ReactElement => {
  const { title, placeholder, gigInfo, tags, itemName, itemInput, setItem, setItemInput, setGigInfo, counterText } = props;
  const [isKeyReleased, setIsKeyReleased] = useState<boolean>(false);

  const maxTagCount = 10;

  const onChange = (event: ChangeEvent): void => {
    const { value } = event.target as HTMLInputElement;
    setItemInput(value);
  };

  const onKeyUp = (): void => {
    setIsKeyReleased(true);
  };
  return <div>TagsInput</div>;
};

export default TagsInput;
