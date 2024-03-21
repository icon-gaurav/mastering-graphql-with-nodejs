import {describe, expect, test} from '@jest/globals';
import {GraphQLClient} from 'graphql-request';


// create a new graphql client for requesting to our api
const client = new GraphQLClient("http://localhost:4000/")


describe('create post mutation', () => {

    test('creates a new post', async () => {

        // graphql query
        const query = `#graphql 
        mutation CREATE_POST_TEST($title: String!, $content: String) {
            createPost(title: $title, content: $content) {
                _id
                content
                content
                title
            }
        }
        `;

        // query variables
        const variables = {
            "title": "testing post title",
            "content": "testing post content"
        };

        let data: any = {};

        try {
            // execute the query
            data = await client.request(query, variables);

        } catch (e) {
            // report the error
            console.log(e)
        }

        expect(data?.createPost).toHaveProperty("title", variables?.title)

    },10000);


});


