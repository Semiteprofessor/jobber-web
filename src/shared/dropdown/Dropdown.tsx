import { filter } from 'lodash';
import { ChangeEvent, FC, MouseEvent, ReactElement, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import Button from '../button/Button';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import TextInput from '../inputs/TextInput';
import { IDropdownProps } from '../shared.interface';

const Dropdown: FC<IDropdownProps> = ({
  text,
  maxHeight,
  mainClassNames,
  showSearchInput,
  dropdownClassNames,
  values,
  style,
  setValue,
  onClick
}): ReactElement => {
  const [dropdownItems, setDropdownItems] = useState<string[]>(values);
  const [inputText, setInputText] = useState<string>(text);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [toggleDropdown, setToggleDropdown] = useDetectOutsideClick(dropdownRef, false);

  const onHandleSelect = (event: MouseEvent): void => {
    const selectedItem: string = (event.target as HTMLLIElement).textContent as string;
    if (setValue) {
      setValue(selectedItem);
    }
    setInputText(selectedItem);
    setDropdownItems(values);
    setToggleDropdown(false);
    if (onClick) {
      onClick(selectedItem);
    }
  };

  return <div>Dropdown</div>;
};

export default Dropdown;
