<?php
namespace airtableWP\Inc;


class Utilities
{
    public static function airtableConfig()
    {
        $options = get_option('airtable_WP_options');
        $apiKey = isset($options['api_key']) ? $options['api_key'] : '';
        $baseId = isset($options['base_id']) ? $options['base_id'] : '';
        $tableName = isset($options['table_name']) ? $options['table_name'] : '';
        $email_field = isset($options['email_field_name']) ? $options['email_field_name'] : 'Primary Email';

        return [
            'api_key' => $apiKey,
            'base_ID' => $baseId,
            'table_name' => $tableName,
            'email_field_name' => $email_field
        ];
    }



    public static function email_exists_in_airtable($email)
    {
        // Airtable API details
        $apiDetails = self::airtableConfig();
        $api_key = $apiDetails['api_key'];
        $base_id = $apiDetails['base_ID'];
        $table_name = $apiDetails['table_name'];
        $email_field = $apiDetails['email_field_name'];
        if (is_array($email)) {
            //return false;
            $email = implode(', ', $email); // Convert array to string if needed
            error_log($email);
        }
    
        // Form Airtable API URL
        $api_url = "https://api.airtable.com/v0/{$base_id}/{$table_name}?filterByFormula=" . urlencode("{" . $email_field . "}='{$email}'");
    
        // Make API request to check if email exists
        $response = wp_remote_get(
            $api_url,
            array(
                'headers' => array(
                    'Authorization' => 'Bearer ' . $api_key,
                ),
                'timeout' => 15, // Increase timeout to 15 seconds
            )
        );
    
        if (is_wp_error($response)) {
            // Log or handle the error
            error_log('Error checking email in Airtable: ' . $response->get_error_message());
            return false;
        }
    
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
    
        // Log the raw response body for debugging
        error_log('Airtable response body: ' . print_r($body, true));
    
        // Check if records exist in the response
        if (!empty($data['records'])) {
            error_log('email_exists_in_airtable');
        }
        return !empty($data['records']);
    }
    

    // Function to add email to Airtable

    public static function add_record_to_airtable($data)
    {
        // Airtable API details
        $apiDetails = self::airtableConfig();
        $api_key = $apiDetails['api_key'];
        $base_id = $apiDetails['base_ID'];
        $table_name = $apiDetails['table_name'];

        // Form Airtable API URL
        $api_url = "https://api.airtable.com/v0/{$base_id}/{$table_name}";

        // Prepare data for Airtable
        // $data = array(
        //    'fields' => array(
        //       'Primary Email' => $email,
        // Add other fields as needed
        //   ),
        //  );

        // Make API request to add email to Airtable
        $response = wp_remote_post(
            $api_url,
            array(
                'headers' => array(
                    'Authorization' => 'Bearer ' . $api_key,
                    'Content-Type' => 'application/json',
                ),
                'body' => wp_json_encode($data),
            )
        );

        if (is_wp_error($response)) {
            // Log or handle the error
            error_log('Error adding email to Airtable: ' . $response->get_error_message());
        } else {
            // Check if the request was successful
            $response_code = wp_remote_retrieve_response_code($response);
            if ($response_code !== 200) {
                // Log or handle the unexpected response
                error_log('Unexpected response adding email to Airtable: ' . $response_code);
            }
        }
    }

    public static function update_record_in_airtable($data, $email, $debug_info)
    {
        // Airtable API details
        $apiDetails = self::airtableConfig();
        $api_key = $apiDetails['api_key'];
        $base_id = $apiDetails['base_ID'];
        $table_name = $apiDetails['table_name'];
        $emailField = $apiDetails['email_field_name'];
        $logData = $data;
        if (is_array($logData)) {
            //return false;
            $logData = json_encode($logData, JSON_PRETTY_PRINT); // Convert array (including sub-arrays) to JSON string
        }

        error_log($email . ', data->' . $logData);
        // Form Airtable API URL for search
        $api_url = "https://api.airtable.com/v0/{$base_id}/{$table_name}?filterByFormula=" . urlencode("{" . $emailField . "}='{$email}'");
        error_log('api url ->' . $api_url);

        // Make API request to search for the record by email
        $response = wp_remote_get(
            $api_url,
            array(
                'headers' => array(
                    'Authorization' => 'Bearer ' . $api_key,
                ),
            )
        );

        if (is_wp_error($response)) {
            // Log or handle the error
            error_log('Error searching email in Airtable: ' . $response->get_error_message());
            return;
        }

        $body = wp_remote_retrieve_body($response);
        $records = json_decode($body, true);

        if (!empty($records['records'])) {
            // Record found, update it
            $record_id = $records['records'][0]['id'];
            $update_url = "https://api.airtable.com/v0/{$base_id}/{$table_name}/{$record_id}";

            // Make API request to update the record
            $update_response = wp_remote_post(
                $update_url,
                array(
                    'method' => 'PATCH',
                    'headers' => array(
                        'Authorization' => 'Bearer ' . $api_key,
                        'Content-Type' => 'application/json',
                    ),
                    'body' => wp_json_encode(array('fields' => $data)),
                )
            );

            if (is_wp_error($update_response)) {
                // Log or handle the error
                error_log('Error updating record in Airtable: ' . $update_response->get_error_message());
            } else {
                // Check if the request was successful
                $response_code = wp_remote_retrieve_response_code($update_response);
                if ($response_code !== 200) {
                    // Log or handle the unexpected response
                    error_log('Unexpected response updating record in Airtable: ' . $response_code);
                } else {
                    self::SuccessResponse($record_id, $data, $debug_info);
                }
            }
        } else {
            error_log('Record not found in airtable');
          
        }
    }
    public static function SuccessResponse($record_id,$form_data, $debug_info)
    {
        $debug_info['record ID'] = $record_id;
        wp_send_json_success(
            array(
                'message' => 'Form data received successfully.',
                'data' => $form_data,
                'debug_info' => $debug_info,
                'record_id' => $record_id
            )
        );
    }
}