import React from "react";
import Error from "../../src/components/Shared/Error";
import Main from "../../src/components/Shared/Main";
import Jumbotron from "../../src/components/Shared/Jumbotron";
import Link from "next/link";
import { Container } from "react-materialize";
import { GetServerSideProps } from "next";
import { GetForumsQuery, useGetForumsQuery } from "../../@types/schema";
import client from "../../src/services/ApplicationService";
import getForums from "./getForums.graphql";

export interface ForumsProps {
  forums: GetForumsQuery["getForums"] | null;
}

export const getServerSideProps: GetServerSideProps<ForumsProps> = async () => {
  const { data } = await client.query<GetForumsQuery>({ query: getForums });

  return {
    props: {
      forums: data?.getForums || null,
    },
  };
};

const Forums: React.FC<ForumsProps> = ({ forums }) => {
  if (!forums) {
    return (
      <Error
        message={""}
        error={"This forum did not load properly, it seems."}
      />
    );
  }

  return (
    <Main title={"Forums"}>
      <Jumbotron short>
        <h1>Forums</h1>
      </Jumbotron>

      <div className="tab-row-container">
        <div className="tab-row pushpin">
          <div className="container">
            <ul className="tabs">
              <li className={"tab"}>
                <Link href="/forums">System Forums</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Container>
        <div className={"margin-top--large page-header with-search"}>
          This particular list is under construction. It will change.{" "}
          <u>
            Please ignore that it says there are no recent posts, I promise
            there are probably recent posts.
          </u>
          <br />
          <br />
          This is part of an ongoing effort to improve moderation and security
          in the forums. You see, Refsheet.net has two site administrators right
          now, and we get very sad when we have more work to do than necessary.
          Vector is pretty tired right now, and Mau doesn't really have time to
          moderate with all the coding that they are doing, so we're running on
          a close-to-zero tolerance policy when it comes to people being not
          excellent here.
        </div>
        <table>
          <thead>
            <tr>
              <th>Forum</th>
              <th>Topics</th>
              <th>Posts</th>
              <th>Last Post</th>
            </tr>
          </thead>
          <tbody>
            {forums.map((forum) => (
              <tr key={forum?.id}>
                <td>
                  <div>
                    <Link href={`/forums/${forum?.slug}`}>{forum?.name}</Link>
                    <div className={"muted"}>{forum?.summary}</div>
                  </div>
                </td>
                <td>0</td>
                <td>0</td>
                <td>Very Old</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Main>
  );
};

export default Forums;
