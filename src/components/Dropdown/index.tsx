import React from "react";
import { Button, Dropdown, Radio, RadioChangeEvent, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { RadioProps } from "../../pages/Contact/ContactList";

interface DropDownProps {
  items: RadioProps[];
  title: string;
  trigger: "click" | "hover" | "contextMenu";
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (e: RadioChangeEvent) => void;
  selectedValue: string;
}

const DropDown: React.FC<DropDownProps> = (props) => {
  const { items, title, trigger, open, setOpen, onChange, selectedValue } = props;
  return (
    <Dropdown
      trigger={[trigger]}
      dropdownRender={(menu) => {
        return (
          <>
            {menu}
            <Radio.Group
              onChange={onChange}
              style={{ backgroundColor: "white", padding: 16, borderRadius: 26 }}
              value={selectedValue ? selectedValue.toLowerCase() : ""}
            >
              <Space direction="vertical">
                {items.map((item) => {
                  return (
                    <Radio value={item.value} key={item.value}>
                      {item.label}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </>
        );
      }}
      open={open}
      onOpenChange={(flag: boolean) => {
        setOpen(flag);
      }}
    >
      <Button size="small" onClick={() => setOpen(!open)}>
        <Space>
          {selectedValue || title}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropDown;
