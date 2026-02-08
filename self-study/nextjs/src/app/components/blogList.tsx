"use client";
import { List, Avatar } from "antd";
import React from "react";
import { data } from "../data";
import Link from "next/link";

interface BlogItem {
  id: number;
  title: string;
  description: string;
}

export default function BlogList() {
  return (
    <List
       itemLayout="horizontal"
       dataSource={data}
       renderItem={(item: BlogItem, index: number) => (
        <List.Item>
            <List.Item.Meta
              className="items-center!"
              avatar={
                <Avatar
                src={`https://api.dicebar.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={
                <Link href={`/blog/${item.id}`}>
                  {item.title}
                </Link>
              }
            />
        </List.Item>
      )}
    />
  );
}
