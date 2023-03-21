// Generated by gencpp from file stagehands/setTargetPoseRequest.msg
// DO NOT EDIT!


#ifndef STAGEHANDS_MESSAGE_SETTARGETPOSEREQUEST_H
#define STAGEHANDS_MESSAGE_SETTARGETPOSEREQUEST_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace stagehands
{
template <class ContainerAllocator>
struct setTargetPoseRequest_
{
  typedef setTargetPoseRequest_<ContainerAllocator> Type;

  setTargetPoseRequest_()
    : xPos(0.0)
    , yPos(0.0)
    , thetaPos(0.0)  {
    }
  setTargetPoseRequest_(const ContainerAllocator& _alloc)
    : xPos(0.0)
    , yPos(0.0)
    , thetaPos(0.0)  {
  (void)_alloc;
    }



   typedef double _xPos_type;
  _xPos_type xPos;

   typedef double _yPos_type;
  _yPos_type yPos;

   typedef double _thetaPos_type;
  _thetaPos_type thetaPos;





  typedef boost::shared_ptr< ::stagehands::setTargetPoseRequest_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::stagehands::setTargetPoseRequest_<ContainerAllocator> const> ConstPtr;

}; // struct setTargetPoseRequest_

typedef ::stagehands::setTargetPoseRequest_<std::allocator<void> > setTargetPoseRequest;

typedef boost::shared_ptr< ::stagehands::setTargetPoseRequest > setTargetPoseRequestPtr;
typedef boost::shared_ptr< ::stagehands::setTargetPoseRequest const> setTargetPoseRequestConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::stagehands::setTargetPoseRequest_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >::stream(s, "", v);
return s;
}


template<typename ContainerAllocator1, typename ContainerAllocator2>
bool operator==(const ::stagehands::setTargetPoseRequest_<ContainerAllocator1> & lhs, const ::stagehands::setTargetPoseRequest_<ContainerAllocator2> & rhs)
{
  return lhs.xPos == rhs.xPos &&
    lhs.yPos == rhs.yPos &&
    lhs.thetaPos == rhs.thetaPos;
}

template<typename ContainerAllocator1, typename ContainerAllocator2>
bool operator!=(const ::stagehands::setTargetPoseRequest_<ContainerAllocator1> & lhs, const ::stagehands::setTargetPoseRequest_<ContainerAllocator2> & rhs)
{
  return !(lhs == rhs);
}


} // namespace stagehands

namespace ros
{
namespace message_traits
{





template <class ContainerAllocator>
struct IsMessage< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::stagehands::setTargetPoseRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::stagehands::setTargetPoseRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::stagehands::setTargetPoseRequest_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "4d1d9cc6631367773b600cbea11d8455";
  }

  static const char* value(const ::stagehands::setTargetPoseRequest_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x4d1d9cc663136777ULL;
  static const uint64_t static_value2 = 0x3b600cbea11d8455ULL;
};

template<class ContainerAllocator>
struct DataType< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "stagehands/setTargetPoseRequest";
  }

  static const char* value(const ::stagehands::setTargetPoseRequest_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "float64 xPos\n"
"float64 yPos\n"
"float64 thetaPos\n"
;
  }

  static const char* value(const ::stagehands::setTargetPoseRequest_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.xPos);
      stream.next(m.yPos);
      stream.next(m.thetaPos);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct setTargetPoseRequest_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::stagehands::setTargetPoseRequest_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::stagehands::setTargetPoseRequest_<ContainerAllocator>& v)
  {
    s << indent << "xPos: ";
    Printer<double>::stream(s, indent + "  ", v.xPos);
    s << indent << "yPos: ";
    Printer<double>::stream(s, indent + "  ", v.yPos);
    s << indent << "thetaPos: ";
    Printer<double>::stream(s, indent + "  ", v.thetaPos);
  }
};

} // namespace message_operations
} // namespace ros

#endif // STAGEHANDS_MESSAGE_SETTARGETPOSEREQUEST_H
