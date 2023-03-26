# This Python file uses the following encoding: utf-8
"""autogenerated by genpy from stagehands_ros/setTargetPoseRequest.msg. Do not edit."""
import codecs
import sys
python3 = True if sys.hexversion > 0x03000000 else False
import genpy
import struct


class setTargetPoseRequest(genpy.Message):
  _md5sum = "aaeb198e8239ff7679a0d51a1562b12c"
  _type = "stagehands_ros/setTargetPoseRequest"
  _has_header = False  # flag to mark the presence of a Header object
  _full_text = """float64 xPos
float64 yPos
float64[] rotationQuaternion
float64 micHeight
string ledAnimation
int64[] ledRGBColour
float64 flashFrequency
"""
  __slots__ = ['xPos','yPos','rotationQuaternion','micHeight','ledAnimation','ledRGBColour','flashFrequency']
  _slot_types = ['float64','float64','float64[]','float64','string','int64[]','float64']

  def __init__(self, *args, **kwds):
    """
    Constructor. Any message fields that are implicitly/explicitly
    set to None will be assigned a default value. The recommend
    use is keyword arguments as this is more robust to future message
    changes.  You cannot mix in-order arguments and keyword arguments.

    The available fields are:
       xPos,yPos,rotationQuaternion,micHeight,ledAnimation,ledRGBColour,flashFrequency

    :param args: complete set of field values, in .msg order
    :param kwds: use keyword arguments corresponding to message field names
    to set specific fields.
    """
    if args or kwds:
      super(setTargetPoseRequest, self).__init__(*args, **kwds)
      # message fields cannot be None, assign default values for those that are
      if self.xPos is None:
        self.xPos = 0.
      if self.yPos is None:
        self.yPos = 0.
      if self.rotationQuaternion is None:
        self.rotationQuaternion = []
      if self.micHeight is None:
        self.micHeight = 0.
      if self.ledAnimation is None:
        self.ledAnimation = ''
      if self.ledRGBColour is None:
        self.ledRGBColour = []
      if self.flashFrequency is None:
        self.flashFrequency = 0.
    else:
      self.xPos = 0.
      self.yPos = 0.
      self.rotationQuaternion = []
      self.micHeight = 0.
      self.ledAnimation = ''
      self.ledRGBColour = []
      self.flashFrequency = 0.

  def _get_types(self):
    """
    internal API method
    """
    return self._slot_types

  def serialize(self, buff):
    """
    serialize message into buffer
    :param buff: buffer, ``StringIO``
    """
    try:
      _x = self
      buff.write(_get_struct_2d().pack(_x.xPos, _x.yPos))
      length = len(self.rotationQuaternion)
      buff.write(_struct_I.pack(length))
      pattern = '<%sd'%length
      buff.write(struct.Struct(pattern).pack(*self.rotationQuaternion))
      _x = self.micHeight
      buff.write(_get_struct_d().pack(_x))
      _x = self.ledAnimation
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      buff.write(struct.Struct('<I%ss'%length).pack(length, _x))
      length = len(self.ledRGBColour)
      buff.write(_struct_I.pack(length))
      pattern = '<%sq'%length
      buff.write(struct.Struct(pattern).pack(*self.ledRGBColour))
      _x = self.flashFrequency
      buff.write(_get_struct_d().pack(_x))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize(self, str):
    """
    unpack serialized message in str into this message instance
    :param str: byte array of serialized message, ``str``
    """
    if python3:
      codecs.lookup_error("rosmsg").msg_type = self._type
    try:
      end = 0
      _x = self
      start = end
      end += 16
      (_x.xPos, _x.yPos,) = _get_struct_2d().unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      pattern = '<%sd'%length
      start = end
      s = struct.Struct(pattern)
      end += s.size
      self.rotationQuaternion = s.unpack(str[start:end])
      start = end
      end += 8
      (self.micHeight,) = _get_struct_d().unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.ledAnimation = str[start:end].decode('utf-8', 'rosmsg')
      else:
        self.ledAnimation = str[start:end]
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      pattern = '<%sq'%length
      start = end
      s = struct.Struct(pattern)
      end += s.size
      self.ledRGBColour = s.unpack(str[start:end])
      start = end
      end += 8
      (self.flashFrequency,) = _get_struct_d().unpack(str[start:end])
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e)  # most likely buffer underfill


  def serialize_numpy(self, buff, numpy):
    """
    serialize message with numpy array types into buffer
    :param buff: buffer, ``StringIO``
    :param numpy: numpy python module
    """
    try:
      _x = self
      buff.write(_get_struct_2d().pack(_x.xPos, _x.yPos))
      length = len(self.rotationQuaternion)
      buff.write(_struct_I.pack(length))
      pattern = '<%sd'%length
      buff.write(self.rotationQuaternion.tostring())
      _x = self.micHeight
      buff.write(_get_struct_d().pack(_x))
      _x = self.ledAnimation
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      buff.write(struct.Struct('<I%ss'%length).pack(length, _x))
      length = len(self.ledRGBColour)
      buff.write(_struct_I.pack(length))
      pattern = '<%sq'%length
      buff.write(self.ledRGBColour.tostring())
      _x = self.flashFrequency
      buff.write(_get_struct_d().pack(_x))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize_numpy(self, str, numpy):
    """
    unpack serialized message in str into this message instance using numpy for array types
    :param str: byte array of serialized message, ``str``
    :param numpy: numpy python module
    """
    if python3:
      codecs.lookup_error("rosmsg").msg_type = self._type
    try:
      end = 0
      _x = self
      start = end
      end += 16
      (_x.xPos, _x.yPos,) = _get_struct_2d().unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      pattern = '<%sd'%length
      start = end
      s = struct.Struct(pattern)
      end += s.size
      self.rotationQuaternion = numpy.frombuffer(str[start:end], dtype=numpy.float64, count=length)
      start = end
      end += 8
      (self.micHeight,) = _get_struct_d().unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.ledAnimation = str[start:end].decode('utf-8', 'rosmsg')
      else:
        self.ledAnimation = str[start:end]
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      pattern = '<%sq'%length
      start = end
      s = struct.Struct(pattern)
      end += s.size
      self.ledRGBColour = numpy.frombuffer(str[start:end], dtype=numpy.int64, count=length)
      start = end
      end += 8
      (self.flashFrequency,) = _get_struct_d().unpack(str[start:end])
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e)  # most likely buffer underfill

_struct_I = genpy.struct_I
def _get_struct_I():
    global _struct_I
    return _struct_I
_struct_2d = None
def _get_struct_2d():
    global _struct_2d
    if _struct_2d is None:
        _struct_2d = struct.Struct("<2d")
    return _struct_2d
_struct_d = None
def _get_struct_d():
    global _struct_d
    if _struct_d is None:
        _struct_d = struct.Struct("<d")
    return _struct_d
# This Python file uses the following encoding: utf-8
"""autogenerated by genpy from stagehands_ros/setTargetPoseResponse.msg. Do not edit."""
import codecs
import sys
python3 = True if sys.hexversion > 0x03000000 else False
import genpy
import struct


class setTargetPoseResponse(genpy.Message):
  _md5sum = "6de314e2dc76fbff2b6244a6ad70b68d"
  _type = "stagehands_ros/setTargetPoseResponse"
  _has_header = False  # flag to mark the presence of a Header object
  _full_text = """string response
"""
  __slots__ = ['response']
  _slot_types = ['string']

  def __init__(self, *args, **kwds):
    """
    Constructor. Any message fields that are implicitly/explicitly
    set to None will be assigned a default value. The recommend
    use is keyword arguments as this is more robust to future message
    changes.  You cannot mix in-order arguments and keyword arguments.

    The available fields are:
       response

    :param args: complete set of field values, in .msg order
    :param kwds: use keyword arguments corresponding to message field names
    to set specific fields.
    """
    if args or kwds:
      super(setTargetPoseResponse, self).__init__(*args, **kwds)
      # message fields cannot be None, assign default values for those that are
      if self.response is None:
        self.response = ''
    else:
      self.response = ''

  def _get_types(self):
    """
    internal API method
    """
    return self._slot_types

  def serialize(self, buff):
    """
    serialize message into buffer
    :param buff: buffer, ``StringIO``
    """
    try:
      _x = self.response
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      buff.write(struct.Struct('<I%ss'%length).pack(length, _x))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize(self, str):
    """
    unpack serialized message in str into this message instance
    :param str: byte array of serialized message, ``str``
    """
    if python3:
      codecs.lookup_error("rosmsg").msg_type = self._type
    try:
      end = 0
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.response = str[start:end].decode('utf-8', 'rosmsg')
      else:
        self.response = str[start:end]
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e)  # most likely buffer underfill


  def serialize_numpy(self, buff, numpy):
    """
    serialize message with numpy array types into buffer
    :param buff: buffer, ``StringIO``
    :param numpy: numpy python module
    """
    try:
      _x = self.response
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      buff.write(struct.Struct('<I%ss'%length).pack(length, _x))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize_numpy(self, str, numpy):
    """
    unpack serialized message in str into this message instance using numpy for array types
    :param str: byte array of serialized message, ``str``
    :param numpy: numpy python module
    """
    if python3:
      codecs.lookup_error("rosmsg").msg_type = self._type
    try:
      end = 0
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.response = str[start:end].decode('utf-8', 'rosmsg')
      else:
        self.response = str[start:end]
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e)  # most likely buffer underfill

_struct_I = genpy.struct_I
def _get_struct_I():
    global _struct_I
    return _struct_I
class setTargetPose(object):
  _type          = 'stagehands_ros/setTargetPose'
  _md5sum = '5c0e8c1ef239833f4aa2b438a827901b'
  _request_class  = setTargetPoseRequest
  _response_class = setTargetPoseResponse