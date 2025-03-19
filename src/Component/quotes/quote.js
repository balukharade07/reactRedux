import React, { createContext, useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Form,
  Collapse,
  Input,
  Button,
  Modal,
  Space,
  message,
  Popconfirm,
} from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { errorParser } from "../Constant";
const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

const Quote = () => {
  const [modal, contextHolder] = Modal.useModal();
  const { userId: _id } = useParams();
  const [quoteData, setQuoteDara] = useState([]);
  const navigate = useNavigate();
  const form = useRef();
  useEffect(() => {
    getQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuote = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/getQuote/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setQuoteDara(response.data);
      })
      .catch((error) => errorParser(error, navigate));
  };
  const handleOk = async (item) => {
    const token = localStorage.getItem("token");
    if (item) {
      return await form.current
        .validateFields()
        .then((values) => {
          axios
            .put(
              `http://localhost:5000/editQuote/${item._id}`,
              { quote: values.quote },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {
              message.success("Quote Updated Successfully...!!");
              getQuote();
            })
            .catch((error) => {
              errorParser(error, navigate);
              message.error("Already modify this quote.");
            });
        })
        .catch((error) => {
          errorParser(error, navigate);
          return Promise.reject(false);
        });
    }
    return await form.current
      .validateFields()
      .then((values) => {
        axios
          .post("http://localhost:5000/addQuote", values, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            message.success("Quote Created Successfully...!!");
            getQuote();
          })
          .catch((error) => {
            errorParser(error, navigate);
          });
      })
      .catch((error) => {
        errorParser(error, navigate);
        return Promise.reject(false);
      });
  };

  const handleDelete = (_id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/delete/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        message.success("Quote Deleted Successfully...!!");
        setQuoteDara(quoteData?.filter((item) => item._id !== _id));
      })
      .catch((error) => {
        errorParser(error, navigate);
      });
  };
  const config = (item = undefined) => {
    return {
      title: item ? "Update Quote" : "Create Your Quote!",
      onOk: () => handleOk(item),
      icon: false,
      width: "500px",
      content: (
        <>
          <Form
            name="control-hooks"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            ref={form}
            initialValues={{
              by: item?.by ? undefined : _id,
              quote: undefined || item?.quote,
            }}
          >
            <Form.Item
              label=""
              name="quote"
              rules={[
                {
                  required: true,
                  message: "Please input your quote!",
                },
                { whitespace: true, message: "White space not allowed!" },
              ]}
            >
              <Input placeholder="Please input your quote!" />
            </Form.Item>
            <Form.Item name="by" label="Name" style={{ display: "none" }}>
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </>
      ),
    };
  };
  const genExtra = (item) => (
    <>
      <EditTwoTone
        title="Edit"
        onClick={(event) => {
          event.stopPropagation();
          modal.confirm(config(item));
        }}
      />
      <Popconfirm
        title="Sure to Delete?"
        onCancel={(event) => {
          event.stopPropagation();
        }}
        onConfirm={(event) => {
          event.stopPropagation();
          handleDelete(item._id);
        }}
      >
        <DeleteTwoTone
          title="Delete"
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Popconfirm>
    </>
  );
  return (
    <>
      <div>
        <Row>
          <Col span={20}>
            <h2>Your Quote</h2>
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            <ReachableContext.Provider value="Light">
              <Space>
                <Button
                  onClick={() => {
                    modal.confirm(config());
                  }}
                  type="primary"
                >
                  Create Quote{" "}
                </Button>
              </Space>
              {contextHolder}
              <UnreachableContext.Provider value="Bamboo" />
            </ReachableContext.Provider>
          </Col>
        </Row>
        <div style={{ marginTop: "10px" }}>
          <Collapse expandIcon={false} accordion={false} collapsible="header">
            {quoteData?.map((item) => {
              return (
                <Collapse.Panel
                  key={item._id}
                  showArrow={false}
                  header={item.quote}
                  extra={genExtra(item)}
                />
              );
            })}
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default Quote;
