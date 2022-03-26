/*
 * Copyright (c) 2020 BlackBerry Limited. All Rights Reserved.
 * Some modifications to the original Apache httpcomponents-client
 * from: https://github.com/apache/httpcomponents-client/
 *
 * ====================================================================
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * ====================================================================
 *
 * This software consists of voluntary contributions made by many
 * individuals on behalf of the Apache Software Foundation.  For more
 * information on the Apache Software Foundation, please see
 * <http://www.apache.org/>.
 *
 */

package com.blackberry.bbd.apache.http.entity.mime.content;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.blackberry.bbd.apache.core.util.Args;
import com.blackberry.bbd.apache.core.http.ContentType;
import com.blackberry.bbd.apache.http.entity.mime.MIME;

/**
 * Binary body part backed by an input stream.
 *
 * @see com.blackberry.bbd.apache.http.entity.mime.MultipartEntityBuilder
 *
 * @since 4.0
 */
public class InputStreamBody extends AbstractContentBody {

    private final InputStream in;
    private final String filename;

    public InputStreamBody(final InputStream in, final String filename) {
        this(in, ContentType.DEFAULT_BINARY, filename);
    }

    /**
     * @since 4.3
     */
    public InputStreamBody(final InputStream in, final ContentType contentType, final String filename) {
        super(contentType);
        Args.notNull(in, "Input stream");
        this.in = in;
        this.filename = filename;
    }

    /**
     * @since 4.3
     */
    public InputStreamBody(final InputStream in, final ContentType contentType) {
        this(in, contentType, null);
    }

    public InputStream getInputStream() {
        return this.in;
    }

    @Override
    public void writeTo(final OutputStream out) throws IOException {
        Args.notNull(out, "Output stream");
        try {
            final byte[] tmp = new byte[4096];
            int l;
            while ((l = this.in.read(tmp)) != -1) {
                out.write(tmp, 0, l);
            }
            out.flush();
        } finally {
            this.in.close();
        }
    }

    @Override
    public String getTransferEncoding() {
        return MIME.ENC_BINARY;
    }

    @Override
    public long getContentLength() {
        return -1;
    }

    @Override
    public String getFilename() {
        return this.filename;
    }

}
