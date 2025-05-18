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

  const onKeyDown = (event: KeyboardEvent, input: string, tagsList: string[]): void => {
    const { key } = event;
    const trimmedInput: string = input.trim();
    if (!trimmedInput) {
      return;
    }

    if (tagsList.length + 1 <= maxTagCount) {
      if (key === ',' && trimmedInput.length && !tagsList.includes(trimmedInput)) {
        event.preventDefault();
        setItem((prevState: string[]) => [...prevState, trimmedInput]);
        setItemInput('');
        const gigInfoList: string[] = gigInfo[`${itemName}`] as string[];
        setGigInfo({ ...gigInfo, [`${itemName}`]: [...gigInfoList, trimmedInput] });
      }
    }

    if (key === 'Backspace' && !input.length && tagsList.length && isKeyReleased) {
      const tagsCopy: string[] = [...tagsList];
      const poppedTag: string = tagsCopy.pop() as string;
      event.preventDefault();
      setItem(tagsCopy);
      setItemInput(poppedTag);
      setGigInfo({ ...gigInfo, [`${itemName}`]: [...tagsCopy] });
    }
    setIsKeyReleased(false);
  };

  const deleteTag = (index: number): void => {
    setItem((prevState: string[]) => prevState.filter((_, i: number) => i !== index));
    const gigInfoList: string[] = gigInfo[`${itemName}`] as string[];
    setGigInfo({ ...gigInfo, [`${itemName}`]: gigInfoList.filter((_, i: number) => i !== index) });
  };

  return <div>TagsInput</div>;
};

export default TagsInput;
